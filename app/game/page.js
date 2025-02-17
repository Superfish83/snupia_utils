"use client";

import AnswerBoard from "@/components/answerBoard";
import Score from "@/components/score";
import Timer from "@/components/timer";
import useImages from "@/hooks/useImages";
import Link from "next/link";
import { useEffect, useState } from "react";

const pitchname = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "A#",
  "C#",
  "D#",
  "F#",
  "G#",
];
const notename = [
  "라",
  "시",
  "도",
  "레",
  "미",
  "파",
  "솔",
  "라#",
  "도#",
  "레#",
  "파#",
  "솔#",
];
const octavename = ["2", "3", "4", "5", "6"];

export default function Game() {
  const [gameStatus, setGameStatus] = useState(0);
  // 0: 게임 진행 중
  // 1: 오답
  // 2: 타임 오버
  const [correctCnt, setCorrectCnt] = useState(0);

  const [quizIdx, setQuizIdx] = useState(0);
  const [answer, setAnswer] = useState(-1);
  const [lastAnswer, setLastAnswer] = useState(-1);

  const images = useImages("quizpic");

  function initGame() {
    setQuizIdx(0); // initial quiz index
    setAnswer(-1); // set answer -1
    setLastAnswer(-1);
    setCorrectCnt(0);
    setGameStatus(0);
  }

  useEffect(() => {
    if (images.loading == false) initGame();
  }, [images]);

  useEffect(() => {
    if (answer == -1) return;

    // Check answer
    const correctAnswer = getKeyFromQuizIdx(quizIdx);
    if (answer == correctAnswer) {
      //alert("정답!");
      setCorrectCnt(correctCnt + 1);

      // 다음 문제 출제
      setQuizIdx((quizIdx + 1) % quizList.length);
    } else {
      //alert("오답!");
      setGameStatus(1);
    }
    setLastAnswer(answer);

    setAnswer(-1);
  }, [answer]);

  function getPitch(key, verbose) {
    if (verbose) {
      return `${key} (${pitchname[key % 12]}${
        octavename[Math.floor(key / 12)]
      },${" "}
        ${notename[key % 12]})`;
    } else {
      return `${pitchname[key % 12]}${octavename[Math.floor(key / 12)]}`;
    }
  }
  function getKeyFromQuizIdx(idx) {
    const t = quizList[idx];
    return parseInt(t.slice(0, [t.indexOf("_")]));
  }

  const GameRunning = () => (
    <div className="w-full h-full flex flex-col">
      <section className="mx-auto mt-14 font-bold text-xl">
        음표에 맞는 음을 누르세요!
      </section>

      <div>
        11{quizList} {loading}
      </div>
      <section className="mx-auto my-4">
        {quizList ? (
          <Score imgsrc={quizList[quizIdx]} />
        ) : (
          <div className="w-40 h-56" />
        )}
      </section>

      <section className="mx-auto my-1">
        <AnswerBoard answer={answer} setAnswer={setAnswer} />
        <div className="text-gray-400">
          [DEBUG] 입력: {getPitch(lastAnswer, true)}
        </div>
      </section>

      <section className="mx-auto my-4">
        <Timer seconds={30} barSize={1000} setGameStatus={setGameStatus} />
      </section>
    </div>
  );

  const GameOver = () => (
    <div className="w-full h-full flex flex-col">
      <section className="mx-auto my-20 font-bold text-xl text-center">
        <div className="text-2xl text-red-300 font-bold">게임 오버!</div>
        <div className="text-red-300">
          {gameStatus == 1 &&
            `오답을 눌렀습니다. (입력: ${getPitch(lastAnswer)}
            , 정답: ${getPitch(getKeyFromQuizIdx(quizIdx))})`}
          {gameStatus == 2 && "제한 시간 종료"}
        </div>
      </section>
      <section className="mx-auto my-10 text-center">
        <div className="font-bold text-2xl">게임 결과</div>
        <div className="font-bold text-xl">맞힌 개수: {correctCnt}개</div>
      </section>
      <section className="mx-auto my-10">
        <Link className="systemBtn" href={"/"}>
          메인 화면으로
        </Link>
      </section>
    </div>
  );

  if (gameStatus == 0) {
    return GameRunning();
  } else {
    return GameOver();
  }
}
