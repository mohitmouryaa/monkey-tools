import { type PresignedPost } from "@aws-sdk/s3-presigned-post";
import { S3Client } from "@aws-sdk/client-s3";
declare const s3: S3Client;
export declare const BUCKET_NAME: string | undefined;
export declare function getUploadUrl(key: string, contentType: string): Promise<PresignedPost>;
export declare function getPublicUrl(key: string): string;
export declare function getDownloadUrl(key: string, filename?: string): Promise<string>;
export declare function downloadFile(key: string, localPath: string): Promise<void>;
export declare const uploadFromFile: (localPath: string, key: string, contentType?: string) => Promise<void>;
export { s3 };
//# sourceMappingURL=index.d.ts.map