"use client";

import { FaInstagram } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";

import localFont from "next/font/local";
import Link from "next/link";

import ScrollProgressBar from "@/components/concert/34/ScrollProgressBar";
import Piece from "@/components/concert/34/piece";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const fontE = localFont({
  src: "./Eulyoo1945-Regular.otf",
});
const fontH = localFont({
  src: "HeirofLightOTFRegular.otf",
});
const fontR = localFont({
  src: "rastanty-cortez.ttf",
});

export default function Concert34() {
  const piecedata1 = require("./pieceData1.json");
  const piecedata2 = require("./pieceData2.json");
  const aboutsnupia = require("./snupia.json");

  const FadeInDiv = ({ delay, className, children }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );

  const Subtitle = ({ className, children }) => (
    <h2
      className={
        "text-[#441919] border-[#441919] border-b-2 font-bold " +
        fontH.className +
        " " +
        className
      }
    >
      {children}
    </h2>
  );

  return (
    <div
      className={
        "p-6 min-h-screen text-black " +
        "bg-gradient-to-tr from-[#826456] via-[#97796b] to-[#826456] " +
        fontE.className
      }
    >
      <ScrollProgressBar />

      <AnimatePresence>
        <div className="flex flex-col gap-8 md:w-2/3 lg:w-1/2 mx-auto">
          <FadeInDiv
            delay={0}
            className={
              "text-center mt-8 text-[#441919] text-5xl font-bold " +
              fontH.className
            }
          >
            <div>
              {"SNUPia"}
              <span
                className={"text-white text-7xl font-normal " + fontR.className}
              >
                {" 34th "}
              </span>
            </div>
            <div>{"Piano Concert"}</div>
          </FadeInDiv>

          <br />

          <FadeInDiv delay={0.5} className={"text-center text-xl break-keep"}>
            <h2>서울대학교 중앙 피아노 동아리</h2>
            <h2>SNUPia의 제 34회 정기연주회에 당신을 초대합니다.</h2>
          </FadeInDiv>
          <br />
          <FadeInDiv
            delay={1.0}
            className={"text-center text-lg flex flex-col"}
          >
            <div className="flex items-center gap-2 mx-auto">
              서울대학교 900동 가온홀
              <Link
                href="https://map.naver.com/p/entry/place/21283824?c=18.66,0,0,0,dh&placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202509010040&locale=ko&svcName=map_pcv5"
                className="rounded-lg p-2 transition-all animate-pulse hover:animate-none bg-[#a28476] hover:bg-[#b29486] "
              >
                <FaMapLocationDot className="w-5 h-5 mx-1" />
              </Link>
            </div>
            <div>2025.09.12(금) 늦은 6시 30분</div>
            <div className="underline">전석 무료</div>
          </FadeInDiv>

          <br />

          <FadeInDiv
            delay={1.2}
            className={"flex flex-col gap-2 items-center w-full"}
          >
            <Subtitle className={"text-2xl"}>PROGRAM</Subtitle>

            <br />

            <div>곡명을 누르면 연주자의 곡 소개를 펼쳐볼 수 있어요.</div>

            <br />

            <Subtitle className={"text-2xl"}>1부</Subtitle>
            <section className="w-full flex flex-col gap-2">
              {piecedata1.map((data, key) => (
                <Piece data={data} key={key} />
              ))}
            </section>

            <br />

            <Subtitle className={"text-xl"}>Intermission</Subtitle>

            <br />

            <Subtitle className={"text-2xl"}>2부</Subtitle>
            <section className="w-full flex flex-col gap-2">
              {piecedata2.map((data, key) => (
                <Piece data={data} key={key} />
              ))}
            </section>
          </FadeInDiv>

          <br />

          <FadeInDiv delay={0.5} className="flex flex-col gap-2">
            <Subtitle className={"text-2xl mx-auto"}>About SNUPia</Subtitle>
            <br />
            {aboutsnupia.about.map((text, key) => (
              <p key={key}>{`⠀${text}`}</p>
            ))}
          </FadeInDiv>

          <footer className="text-center mx-auto flex flex-col">
            <div className="flex flex-col font-bold gap-2 mx-auto">
              <Link
                href="https://www.instagram.com/snupia_snu/"
                className="flex items-center gap-2 mr-auto animate-pulse"
              >
                <FaInstagram className="w-10 h-10" />
                스누피아 인스타그램
              </Link>
              <Link
                href="https://www.snupia.kr"
                className="flex items-center gap-2 mr-auto animate-pulse"
              >
                <FaHome className="w-10 h-10" />
                스누피아 공식 홈페이지
              </Link>
            </div>
            <br />
            <br />
            <div className="text-sm">
              <div>페이지 제작: SNUPia 집행진 정보부 (김연준)</div>
            </div>
            <br />
          </footer>
        </div>
      </AnimatePresence>
    </div>
  );
}
