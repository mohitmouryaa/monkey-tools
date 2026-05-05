import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";
import { getUploadUrl } from "@workspace/storage";

const ALLOWED_PREFIXES = new Set(["uploads", "cms"]);

export async function POST(req: Request) {
  const { filename, contentType, prefix } = await req.json();

  const safePrefix = typeof prefix === "string" && ALLOWED_PREFIXES.has(prefix) ? prefix : "uploads";
  const fileKey = `${safePrefix}/${uuidv4()}-${filename}`;

  const url = await getUploadUrl(fileKey, contentType);

  return NextResponse.json({ url, fileKey });
}
