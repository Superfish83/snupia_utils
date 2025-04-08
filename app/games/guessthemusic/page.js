"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function GuessTheMusic() {
  const [isSettingsClicked, setIsSettingsClicked] = useState(false);

  const handleSettingsClick = () => {
    setIsSettingsClicked(true);
    setTimeout(() => {
      setIsSettingsClicked(false);
    }, 3000); // 3초 후 원래 상태로 복귀
  };

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center"
      style={{ marginTop: "10vh" }}
    >
      <Image
        src="/gameResources/games/2.jpg"
        alt="game2"
        width={1080}
        height={540}
        className="w-80 rounded-xl mb-3"
      />
      <div className="mt-2" style={{ fontSize: "clamp(1rem, 5vw, 6rem)" }}>
        서울대학교 중앙 피아노 동아리 SNUPia
      </div>
      <div className="text-5xl my-2">피아노 음악 퀴즈</div>
      <div className="flex flex-col">
        <Link
          href="/games/guessthemusic/game"
          className="systemBtn w-64 text-center"
        >
          시작
        </Link>
        <button
          className={`systemBtn w-64 text-center mt-1 transition-all duration-500 ${
            isSettingsClicked ? "bg-gray-400 text-gray-700 animate-shake" : ""
          }`}
          onClick={handleSettingsClick}
        >
          {isSettingsClicked ? "설정은 미구현입니다!" : "설정"}
        </button>
        <Link
          href="/games/guessthemusic/ranking"
          className="systemBtn w-64 text-center mt-1"
        >
          랭킹
        </Link>
      </div>

      <Link href="/games/" className="systemBtn w-64 text-center mt-1">
        게임 목록
      </Link>

      <div className="mx-auto mt-5 text-slate-400">
        웹게임 제작: SNUPia 정보부 김민재
      </div>
      <style jsx>{`
        @keyframes shake {
          0% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          50% {
            transform: translateX(5px);
          }
          75% {
            transform: translateX(-5px);
          }
          100% {
            transform: translateX(0);
          }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
