import fs from "fs";
import path from "path";

import { NextResponse } from "next/server";

export async function GET(req, res) {
  // NextApiRequest, NextApiResponse

  const url = new URL(req.url);
  const directory = url.searchParams.get("directory");

  const imagesDir = path.join(process.cwd(), "public", directory);

  try {
    const files = fs.readdirSync(imagesDir);
    const imageFiles = files.filter((file) =>
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
    );

    return NextResponse.json(imageFiles.map((file) => `/${directory}/${file}`));
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to read directory" },
      { status: 500 }
    );
  }
}
