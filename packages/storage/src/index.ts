import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  endpoint: process.env.DO_SPACES_ENDPOINT,
  region: process.env.DO_SPACES_REGION,
  credentials: {
    accessKeyId: process.env.DO_SPACES_ACCESS_KEY || "",
    secretAccessKey: process.env.DO_SPACES_SECRET_KEY || "",
  },
});

export const BUCKET_NAME = process.env.DO_SPACES_BUCKET;

// 1. Generate URL for Frontend to Upload DIRECTLY to S3
export async function getUploadUrl(key: string, contentType: string) {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    ContentType: contentType,
    ACL: "public-read",
  });
  // URL expires in 60 seconds (security best practice)
  return getSignedUrl(s3, command, { expiresIn: 60 });
}

// 2. Generate URL for downloading processed files
export async function getDownloadUrl(key: string) {
  const command = new GetObjectCommand({ Bucket: BUCKET_NAME, Key: key });
  return getSignedUrl(s3, command, { expiresIn: 3600 });
}

export { s3 };
