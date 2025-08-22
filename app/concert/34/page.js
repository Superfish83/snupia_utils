"use client";

import { FaInstagram } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";

import localFont from "next/font/local";
import ScrollProgressBar from "@/components/concert/34/ScrollProgressBar";
import Link from "next/link";
import PieceInfo from "@/components/concert/34/pieceInfo";
const fontDanjung = localFont({
  src: "./Cafe24Danjunghae-v2.0.woff2",
});
const fontPnight = localFont({
  src: "./Cafe24Oneprettynight-v2.0.woff2",
});

export default function Concert34() {
  const piecedata1 = require("./pieceData1.json");
  const piecedata2 = require("./pieceData2.json");

  return (
    <div className="p-12 flex flex-col gap-8 bg-[#a47764] text-[#310606] min-h-screen">
      <ScrollProgressBar />
      <header className={"text-center " + fontDanjung.className}>
        <h1 className="text-4xl">SNUPia 제 34회 정기연주회</h1>
        <h3 className="text-2xl">2025.09.12</h3>
      </header>

      <br />

      <section className={"flex flex-col gap-2 items-center text-lg"}>
        <h2 className={"text-3xl " + fontDanjung.className}>PROGRAM</h2>
        <div>곡명을 누르면 연주자의 곡 소개를 볼 수 있어요.</div>

        <br />

        <h3
          className={
            "text-2xl border-b-2 border-[#310606] " + fontDanjung.className
          }
        >
          1부
        </h3>
        <section>
          {piecedata1.map((data, key) => (
            <PieceInfo data={data} key={key} />
          ))}
        </section>

        <br />
        <h3 className={"text-2xl " + fontDanjung.className}>Intermission</h3>

        <br />

        <h3
          className={
            "text-2xl border-b-2 border-[#310606] " + fontDanjung.className
          }
        >
          2부
        </h3>
        <section>
          {piecedata2.map((data, key) => (
            <PieceInfo data={data} key={key} />
          ))}
        </section>
      </section>

      <footer className="text-center mx-auto flex flex-col">
        <div>방문해 주셔서 감사합니다!</div>
        <div>페이지 제작: 2025-2 SNUPia 정보부</div>
        <br />
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
      </footer>
    </div>
  );
}
