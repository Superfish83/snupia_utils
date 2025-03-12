"use client";

import ConcertBanner from "@/components/concert/concertBanner";
import PieceInfo from "@/components/concert/pieceInfo";
import Image from "next/image";
import { useRef } from "react";

import localFont from "next/font/local";
import ScrollProgressBar from "@/components/concert/ScrollProgressBar";
const fontDanjung = localFont({
  src: "./Cafe24Danjunghae-v2.0.woff2",
});
const fontPnight = localFont({
  src: "./Cafe24Oneprettynight-v2.0.woff2",
});

export default function Home() {
  const piecedata1 = require("@/public/concert/pieceData1.json");
  const piecedata2 = require("@/public/concert/pieceData2.json");
  const chuksa = require("@/public/concert/celebration.json");

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
      <Image
        src={"/concert/jiwonmoon2.jpg"}
        alt="jiwonmoon"
        width={370}
        height={370}
        className="w-40 h-40 rounded-full mx-auto mt-6"
      />
      <div className={"px-6 mt-4 mb-14 text-lg " + fontPnight.className}>
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
        <footer className="bg-black h-32 text-center">
          <Image
            src={"/logo.png"}
            alt="logo"
            width={100}
            height={100}
            className="mx-auto w-10 h-10 mt-6"
          />
          <div className={"pt-2 text-gray-400 text-sm " + fontPnight.className}>
            페이지 제작: 김연준
          </div>
        </footer>
      </section>
    </>
  );
}
