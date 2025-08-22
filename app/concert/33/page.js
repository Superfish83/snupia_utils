"use client";

import ConcertBanner from "@/components/concert/33/concertBanner";
import PieceInfo from "@/components/concert/33/pieceInfo";
import Image from "next/image";
import { useRef } from "react";

import localFont from "next/font/local";
import ScrollProgressBar from "@/components/concert/33/ScrollProgressBar";
import Link from "next/link";
const fontDanjung = localFont({
  src: "./Cafe24Danjunghae-v2.0.woff2",
});
const fontPnight = localFont({
  src: "./Cafe24Oneprettynight-v2.0.woff2",
});

export default function Home() {
  const piecedata1 = require("./pieceData1.json");
  const piecedata2 = require("./pieceData2.json");
  const chuksa = require("./celebration.json");

  const chuksaRef = useRef();

  const Chuksa = () => (
    <>
      <section
        ref={chuksaRef}
        className={
          "mx-auto mt-10 text-3xl border-b-2 w-40 text-center py-4 " +
          fontDanjung.className
        }
      >
        축사
      </section>
      <div className={"px-6 mb-14 text-base " + fontPnight.className}>
        {chuksa[0].text.map((data, key) => (
          <div key={key} className="my-4">
            {"⠀"}
            {data}
          </div>
        ))}
        <div className="mt-4 text-right">
          <div>SNUPia OB 회장</div>
          <div>문지원 (피아노12) 드림</div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <ScrollProgressBar />
      <div className={"h-screen " + fontDanjung.className}>
        <ConcertBanner chuksaRef={chuksaRef} />
      </div>
      <section className="bg-black w-full md:w-2/3 md:mx-auto lg:w-1/2 flex flex-col">
        <Chuksa />
        <section
          className={
            "mx-auto mt-10 text-3xl border-b-2 w-40 text-center py-4 " +
            fontDanjung.className
          }
        >
          PROGRAM
        </section>
        <div className={"mt-8 mx-auto " + fontPnight.className}>
          곡명을 누르면 연주자의 곡 소개를 볼 수 있어요.
        </div>

        <section
          className={
            "mx-auto mt-10 text-2xl border-b-2 w-32 text-center py-4 " +
            fontDanjung.className
          }
        >
          1부
        </section>
        <section className={"px-2 py-10 " + fontPnight.className}>
          {piecedata1.map((data, key) => (
            <PieceInfo data={data} key={key} />
          ))}
        </section>

        <section
          className={
            "mx-auto text-xl border-b-2 w-40 text-center py-4 " +
            fontDanjung.className
          }
        >
          Intermission
        </section>

        <section
          className={
            "mx-auto mt-10 text-2xl border-b-2 w-32 text-center py-4 " +
            fontDanjung.className
          }
        >
          2부
        </section>
        <section className={"px-2 py-10 " + fontPnight.className}>
          {piecedata2.map((data, key) => (
            <PieceInfo data={data} key={key} />
          ))}
        </section>

        <footer
          className={"bg-black py-10 text-center " + fontPnight.className}
        >
          <Image
            src={"/logo.png"}
            alt="logo"
            width={100}
            height={100}
            className="mx-auto w-12 h-12 my-2"
          />
          <div className={"my-4 "}>
            <div>방문해 주셔서 감사합니다!</div>
            <div>About SNUPia</div>
          </div>
          <div className="flex font-bold">
            <Link
              href="https://www.instagram.com/snupia_snu/"
              className="ml-auto mr-2 rounded-xl px-4 py-2 bg-gradient-to-br from-violet-700 via-pink-700 to-yellow-300"
            >
              Instagram
            </Link>
            <Link
              href="https://www.snupia.kr"
              className="mr-auto ml-2 rounded-xl px-4 py-2 bg-slate-700"
            >
              홈페이지
            </Link>
          </div>

          <div
            className={"pt-10 text-gray-400 text-sm " + fontPnight.className}
          >
            페이지 제작: 김연준
          </div>
        </footer>
      </section>
    </>
  );
}
