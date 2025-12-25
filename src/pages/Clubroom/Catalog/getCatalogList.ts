// --------------------------------------------
// getCatalogList.ts
// 소장자료 목록을 excel 파일에서 읽어와 JSON으로 변환하는 함수
// (파일 경로: /clubroom/catalog_list.xlsx)
// (251225 김연준)
// --------------------------------------------

import readXlsxFile from "read-excel-file";

const fileUrl = '/clubroom/catalog_list.xlsx';

export async function getCatalogList(): Promise<Array<Object>> {
    // fetch data
    const fileData = await fetch(fileUrl);
    const fileArrBuf = await fileData.arrayBuffer();
    const rows = (await readXlsxFile(fileArrBuf, { sheet: 2 })).slice(2);

    // process data
    const ret = rows.map((row) => {
        return {
            id: row[0],

            title_kor: row[1],
            title_org: row[2],
            composer_kor: row[4],
            composer_org: row[3],
            transcription: row[5],

            era_kor: row[6],
            era_eng: row[7],
            publisher: row[8],

            desc1: row[10],
            desc2: row[14],
            opus: row[11],
            cond: row[12],
            doner: row[13],
        };
    });
    
    // ret.sort((a, b) : number => {
    //     // Sort by era first, then by title
    //     if (a.era_eng[0] < b.era_eng[0]) return -1;
    //     if (a.era_eng[0] > b.era_eng[0]) return 1;
    //     return 0;
    // });


    return ret;
}