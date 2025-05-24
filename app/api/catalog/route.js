import path from "path";
import fs from "fs";
import * as XLSX from "xlsx";
import { NextResponse } from "next/server";

function getCatalogData() {
  const filePath = path.join(process.cwd(), "app/api/catalog/catalog.xlsx");
  const fileBuffer = fs.readFileSync(filePath);

  // Parse the Excel file
  const workbook = XLSX.read(fileBuffer, { type: "buffer" });
  const sheet0 = workbook.Sheets[workbook.SheetNames[0]];
  var jsonData = XLSX.utils.sheet_to_json(sheet0);
  const resVersion = jsonData[0].version;

  const sheet1 = workbook.Sheets[workbook.SheetNames[1]];
  jsonData = XLSX.utils.sheet_to_json(sheet1);
  const resLabel = jsonData[0];

  let resData = [];

  // process the data into a more usable format
  for (let rowIdx = 1; rowIdx < jsonData.length; rowIdx++) {
    const rowData = jsonData[rowIdx];

    // Skip empty rows
    if (!rowData.id && rowData.id !== 0) {
      continue;
    } else {
      resData.push(rowData);
    }
  }

  resData.sort((a, b) => {
    // Sort by era first, then by title
    if (a.era_eng[0] < b.era_eng[0]) return -1;
    if (a.era_eng[0] > b.era_eng[0]) return 1;
    return 0;
  });

  let catalog = {
    version: resVersion,
    data: resData,
    label: resLabel,
  };

  return catalog;
}

function getCatalogItem(id) {
  const filePath = path.join(process.cwd(), "app/api/catalog/catalog.xlsx");
  const fileBuffer = fs.readFileSync(filePath);

  // Parse the Excel file
  const workbook = XLSX.read(fileBuffer, { type: "buffer" });

  const sheet1 = workbook.Sheets[workbook.SheetNames[1]];
  var jsonData = XLSX.utils.sheet_to_json(sheet1);

  let resData = null;

  // process the data into a more usable format
  for (let rowIdx = 1; rowIdx < jsonData.length; rowIdx++) {
    if (id == jsonData[rowIdx].id) {
      resData = jsonData[rowIdx];
      break;
    }
  }

  return resData;
}

export async function GET(req, res) {
  const req_id = req.nextUrl.searchParams.get("id");
  // Search member info
  try {
    if (req_id && req_id > 0) {
      const resData = getCatalogItem(req_id);
      if (resData) {
        return new NextResponse(JSON.stringify(resData), { status: 200 });
      } else {
        return new NextResponse(JSON.stringify({ error: "Item not found" }), {
          status: 404,
        });
      }
    } else {
      const resData = getCatalogData();
      return new NextResponse(JSON.stringify(resData), { status: 200 });
    }
  } catch (error) {
    console.error("Error reading Excel file:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to read Excel file" }),
      { status: 500 }
    );
  }
}
