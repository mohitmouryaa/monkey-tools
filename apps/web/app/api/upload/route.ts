import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";
import { getUploadUrl } from "@workspace/storage";

export async function POST(req: Request) {
  const { filename, contentType } = await req.json();

  // Create a unique key (folder structure helps organization)
  const fileKey = `uploads/${uuidv4()}-${filename}`;

  const url = await getUploadUrl(fileKey, contentType);

  return NextResponse.json({ url, fileKey });
}
