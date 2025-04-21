import path from "path";
import fs from "fs";
import * as XLSX from "xlsx";
import { NextResponse } from "next/server";

function getMemberData(row) {
  const degree = row.__EMPTY_2;
  const majorText =
    degree === "학사"
      ? `${row.__EMPTY_4} ${row.__EMPTY_5}`
      : `${row.__EMPTY_4} ${row.__EMPTY_5} (${degree})`;

  const memberData = {
    job: row.__EMPTY,
    name: row.__EMPTY_1,
    hakBeon: row.__EMPTY_3,
    major: majorText,
    memClass: row.__EMPTY_8,
    scoreTotal: row.__EMPTY_9 + row.__EMPTY_11,
    scoreNow: row.__EMPTY_11,
    attendance: row.__EMPTY_10,
  };
  return memberData;
}

function getRestMemberData(row) {
  const majorText = row.__EMPTY_2
    ? `${row.__EMPTY_2} ${row.__EMPTY_3}`
    : `${row.__EMPTY_3}`;

  const memberData = {
    name: row.__EMPTY,
    hakBeon: row.__EMPTY_1,
    major: majorText,
    memClass: `휴회원 (최종 ${row.__EMPTY_7})`,
    scoreTotal: row.__EMPTY_5,
    restSemester: row.__EMPTY_8,
  };
  return memberData;
}

export async function GET(req, res) {
  const srch_name = req.nextUrl.searchParams.get("name");
  const srch_num = req.nextUrl.searchParams.get("num");

  // Search member info
  try {
    const filePath = "app/api/memberInfo/memberList.xlsx";
    const fileBuffer = fs.readFileSync(filePath);

    // Parse the Excel file
    const workbook = XLSX.read(fileBuffer, { type: "buffer" });

    // 일반회원 (0번째 시트)
    const sheet0 = workbook.Sheets[workbook.SheetNames[0]];
    var jsonData = XLSX.utils.sheet_to_json(sheet0);

    // Search for member data
    for (var i = 0; i < jsonData.length; i++) {
      if (
        jsonData[i].__EMPTY_1 === srch_name &&
        jsonData[i].__EMPTY_7.slice(9) === srch_num
      ) {
        const resData = getMemberData(jsonData[i]);
        return new NextResponse(JSON.stringify(resData), { status: 200 });
      }
    }

    // 휴회원 (2번째 시트)]
    const sheet2 = workbook.Sheets[workbook.SheetNames[2]];
    jsonData = XLSX.utils.sheet_to_json(sheet2);

    // Search for member data
    for (var i = 0; i < jsonData.length; i++) {
      if (
        jsonData[i].__EMPTY === srch_name &&
        jsonData[i].__EMPTY_4.slice(9) === srch_num
      ) {
        const resData = getRestMemberData(jsonData[i]);
        return new NextResponse(JSON.stringify(resData), { status: 200 });
      }
    }

    // If no data matches the query
    // return 204 No Content
    return new NextResponse(JSON.stringify({ error: "Member not found" }), {
      status: 204,
    });
  } catch (error) {
    console.error("Error reading Excel file:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to read Excel file" }),
      { status: 500 }
    );
  }
}
