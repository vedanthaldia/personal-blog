import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: NextRequest) {
  // Protect the route
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Create a unique filename
    const ext = path.extname(file.name) || '';
    const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}${ext}`;
    
    // Ensure public/uploads directory exists (you can use fs.mkdir in a real setup)
    const publicDir = path.join(process.cwd(), "public", "uploads");
    
    try {
      await writeFile(path.join(publicDir, filename), buffer);
    } catch (e: any) {
      if (e.code === 'ENOENT') {
        const fs = require('fs');
        fs.mkdirSync(publicDir, { recursive: true });
        await writeFile(path.join(publicDir, filename), buffer);
      } else {
        throw e;
      }
    }

    const fileUrl = `/uploads/${filename}`;

    return NextResponse.json({ url: fileUrl });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
