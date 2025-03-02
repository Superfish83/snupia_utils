"use client";

import ConcertBanner from "@/components/concert/concertBanner";
import PieceInfo from "@/components/concert/pieceInfo";
import Link from "next/link";

export default function Home() {
  const piecedata = require("@/public/concert/pieceData.json");
  console.log(piecedata);

  return (
    <>
      <div className="h-screen">
        <ConcertBanner />
      </div>
      <div className="bg-slate-800 w-full h-full px-2 py-10">
        {piecedata.map((data, key) => (
          <PieceInfo data={data} key={key} />
        ))}
      </div>
    </>
  );
}
