"use client";

import { FaInstagram } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";

import localFont from "next/font/local";
import Link from "next/link";

import ScrollProgressBar from "@/components/concert/34/ScrollProgressBar";
import Piece from "@/components/concert/34/piece";

/*
const fontDanjung = localFont({
  src: "./Cafe24Danjunghae-v2.0.woff2",
});
const fontPnight = localFont({
  src: "./Cafe24Oneprettynight-v2.0.woff2",
});
*/

export default function Concert34() {
  const piecedata1 = require("./pieceData1.json");
  const piecedata2 = require("./pieceData2.json");
  const aboutsnupia = require("./snupia.json");

  return (
    <div className="p-6 min-h-screen bg-[#8d6f61] text-[#441919]">
      <ScrollProgressBar />
      <div className="flex flex-col gap-8 md:w-2/3 lg:w-1/2 mx-auto">
        <header className={"text-center mt-8"}>
          <h2 className="text-3xl">서울대학교 중앙 피아노 동아리</h2>
          <h1 className="text-4xl">SNUPia 제 34회 정기연주회</h1>
        </header>

        <br />

        <section className={"text-center text-2xl"}>
          <div>서울대학교 900동 가온홀</div>
          <div>2025.09.12(금) 늦은 6시 30분</div>
          <div>전석 무료</div>
        </section>

        <br />

        <section className={"flex flex-col gap-2 items-center w-full"}>
          <h2 className={"text-3xl "}>PROGRAM</h2>
          <div>곡명을 누르면 연주자의 곡 소개를 볼 수 있어요.</div>

          <br />

          <h3 className={"text-2xl border-b-2 border-[#310606] "}>1부</h3>
          <section className="w-full flex flex-col gap-2">
            {piecedata1.map((data, key) => (
              <Piece data={data} key={key} />
            ))}
          </section>

          <br />

          <h3 className={"text-2xl "}>Intermission</h3>

          <br />

          <h3 className={"text-2xl border-b-2 border-[#310606] "}>2부</h3>
          <section className="w-full flex flex-col gap-2">
            {piecedata2.map((data, key) => (
              <Piece data={data} key={key} />
            ))}
          </section>
        </section>

        <br />

        <section>
          <h2 className={"text-3xl text-center "}>About SNUPia</h2>
          <br />
          <section className="w-full flex flex-col gap-2">
            {aboutsnupia.about.map((text, key) => (
              <p key={key}>{`⠀${text}`}</p>
            ))}
          </section>
        </section>

        <footer className="text-center mx-auto flex flex-col">
          <div className="flex flex-col font-bold gap-2 mx-auto">
            <Link
              href="https://www.instagram.com/snupia_official/"
              className="flex items-center gap-2 mr-auto"
            >
              <FaInstagram className="w-10 h-10" />
              스누피아 인스타그램
            </Link>
            <Link
              href="https://www.snupia.kr"
              className="flex items-center gap-2 mr-auto"
            >
              <FaHome className="w-10 h-10" />
              스누피아 공식 홈페이지
            </Link>
          </div>
          <br />
          <br />
          <div className="text-sm">사전홍보 페이지 제작: 김연준</div>
          <br />
        </footer>
      </div>
    </div>
  );
}
