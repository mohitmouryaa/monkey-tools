import { pipeline } from "node:stream/promises";
import { Upload } from "@aws-sdk/lib-storage";
import { createReadStream, createWriteStream } from "node:fs";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { createPresignedPost, type PresignedPost } from "@aws-sdk/s3-presigned-post";
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  endpoint: process.env.DO_SPACES_ENDPOINT,
  region: process.env.DO_SPACES_REGION,
  credentials: {
    accessKeyId: process.env.DO_SPACES_ACCESS_KEY || "",
    secretAccessKey: process.env.DO_SPACES_SECRET_KEY || "",
  },
  forcePathStyle: true,
  // AWS SDK v3 ≥ 3.729 injeta x-amz-checksum-* na URL assinada; DO Spaces rejeita com 403.
  requestChecksumCalculation: "WHEN_REQUIRED",
  responseChecksumValidation: "WHEN_REQUIRED",
});

export const BUCKET_NAME = process.env.DO_SPACES_BUCKET;

// Limite de 100 MiB por upload direto. Bate com o que o worker aguenta processar
// e protege contra abuso da policy assinada (qualquer um com a URL podia subir
// arquivo gigante, já que ContentLengthRange entra na policy assinada).
const MAX_UPLOAD_BYTES = 100 * 1024 * 1024;

// 1. Generate presigned POST for browser upload.
//
// Por que POST presigned (e não PUT presigned):
// - PUT com Content-Type: <não-simple> dispara preflight CORS no browser.
// - DigitalOcean Spaces tem bug: rejeita OPTIONS preflight com 403 AccessDenied
//   quando a URL contém X-Amz-Signature (tenta validar signature de PUT contra
//   request OPTIONS).
// - POST multipart/form-data é "simple request" → sem preflight → sem bug.
export async function getUploadUrl(key: string, contentType: string): Promise<PresignedPost> {
  return createPresignedPost(s3, {
    Bucket: BUCKET_NAME!,
    Key: key,
    Conditions: [
      ["content-length-range", 0, MAX_UPLOAD_BYTES],
      ["eq", "$Content-Type", contentType],
    ],
    Fields: {
      "Content-Type": contentType,
    },
    Expires: 60,
  });
}

// URL pública canônica do objeto no Spaces (path-style, bucket public-read).
// Usada pelo CMS para gravar src de imagens em posts.
export function getPublicUrl(key: string): string {
  return `${process.env.DO_SPACES_ENDPOINT}/${BUCKET_NAME}/${key}`;
}

// 2. Generate URL for downloading processed files
export async function getDownloadUrl(key: string, filename?: string) {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    ResponseContentDisposition: filename ? `attachment; filename="${filename}"` : "attachment",
  });
  return getSignedUrl(s3, command, { expiresIn: 3600 });
}

export async function downloadFile(key: string, localPath: string) {
  const command = new GetObjectCommand({ Bucket: BUCKET_NAME, Key: key });
  const response = await s3.send(command);

  if (!response.Body) throw new Error("File not found in S3");

  await pipeline(response.Body as NodeJS.ReadableStream, createWriteStream(localPath));
}

function getContentTypeFromKey(key: string): string {
  const ext = key.split(".").pop()?.toLowerCase();
  const mimeTypes: Record<string, string> = {
    pdf: "application/pdf",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    doc: "application/msword",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    xls: "application/vnd.ms-excel",
    pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ppt: "application/vnd.ms-powerpoint",
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    gif: "image/gif",
    webp: "image/webp",
    txt: "text/plain",
    json: "application/json",
    zip: "application/zip",
  };
  return mimeTypes[ext || ""] || "application/octet-stream";
}

export const uploadFromFile = async (localPath: string, key: string, contentType?: string) => {
  const fileStream = createReadStream(localPath);
  const resolvedContentType = contentType || getContentTypeFromKey(key);

  const upload = new Upload({
    client: s3,
    params: {
      Bucket: BUCKET_NAME,
      Key: key,
      Body: fileStream,
      ContentType: resolvedContentType,
    },
  });

  await upload.done();
};

export { s3 };
