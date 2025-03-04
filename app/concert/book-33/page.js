"use client";

import ConcertBanner from "@/components/concert/concertBanner";
import PieceInfo from "@/components/concert/pieceInfo";
import Image from "next/image";
import { useRef } from "react";

export default function Home() {
  const piecedata1 = require("@/public/concert/pieceData1.json");
  const piecedata2 = require("@/public/concert/pieceData2.json");
  const chuksa = require("@/public/concert/celebration.json");

  const chuksaRef = useRef();

  return (
    <>
      <div className="h-screen">
        <ConcertBanner chuksaRef={chuksaRef} />
      </div>
      <section className="bg-black w-full md:w-2/3 md:mx-auto lg:w-1/2 flex flex-col">
        <section
          ref={chuksaRef}
          className="mx-auto mt-10 text-3xl font-bold border-b-2 w-40 text-center py-4 "
        >
          축사
        </section>
        <div className="px-6 my-8">
          {chuksa[0].text.map((data, key) => (
            <div key={key} className="my-4">
              {"⠀"}
              {data}
            </div>
          ))}
          <div>SNUPia OB 회장</div>
          <div>문지원 (피아노12) 드림</div>
        </div>
        <section className="mx-auto mt-10 text-3xl font-bold border-b-2 w-40 text-center py-4 ">
          1부
        </section>
        <section className="px-2 py-10">
          {piecedata1.map((data, key) => (
            <PieceInfo data={data} key={key} />
          ))}
        </section>
        <section className="mx-auto mt-6 font-bold italic border-b-2 w-40 text-center py-4 ">
          Intermission
        </section>
        <section className="mx-auto mt-10 text-3xl font-bold border-b-2 w-40 text-center py-4 ">
          2부
        </section>
        <section className="px-2 py-10">
          {piecedata2.map((data, key) => (
            <PieceInfo data={data} key={key} />
          ))}
        </section>
        <footer className="bg-black h-32 flex text-left items-center">
          <Image
            src={"/logo.png"}
            alt="logo"
            width={100}
            height={100}
            className="ml-auto w-10 h-10"
          />
          <div className="text-slate-200 mr-auto ml-2 text-sm">
            <div>SNUPia 2025</div>
            <div>제33회 정기연주회</div>
          </div>
        </footer>
      </section>
    </>
  );
}
