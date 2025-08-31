"use client"

import { useState } from "react"
import Image from "next/image"

const Q = [
  {
    id: 1,
    text: "음악을 들을 때 나는...",
    imgsrc: "/gameResources/mbti/1.jpg",
    options: [
      { value: "T", text: "화려하고 신나는 음악이 좋아!" },
      { value: "F", text: "잔잔하고 부드러운 음악이 최고지!" },
    ],
  },
  {
    id: 2,
    text: "친구가 새로운 음악을 추천해줬다! 그때 나는...",
    imgsrc: "/gameResources/mbti/2.jpg",
    options: [
      { value: "E", text: "바로 들어봐야지! 좋으면 플리에도 추가할거야" },
      { value: "I", text: "난 듣는거만 들어~" },
    ],
  },
  {
    id: 3,
    text: "딱 하나만 고른다면 나는?",
    imgsrc: "/gameResources/mbti/3.webp",
    options: [
      { value: "J", text: "최신 가요가 제일 좋지" },
      { value: "P", text: "옛날 대중음악중에 명곡이 얼마나 많은데" },
      { value: "X", text: "클래식." },
    ],
  },
  {
    id: 4,
    text: "내가 음악을 고를때는...",
    imgsrc: "/gameResources/mbti/4.avif",
    options: [
      { value: "N", text: "장르나 분위기, 완성도 같은 음악적인 취향대로 고르는편" },
      { value: "S", text: "그냥 듣기만 좋으면 되는거지 뭘~" },
    ],
  },
]

const mbtiTypes = {
  ENTJ: ["리스트", "설명", "liszt.jpg"],
  ENTP: ["바흐", "설명", "bach.jpg"],
  ENFJ: ["슈만", "설명", "schumann.png"],
  ENFP: ["리스트", "설명", "liszt.jpg"],
  ESTJ: ["모차르트", "설명", "mozart.jpg"],
  ESTP: ["비발디", "설명", "vivaldi.jpg"],
  ESFJ: ["드뷔시", "설명", "debussy.jpg"],
  ESFP: ["멘델스존", "설명", "mendelssohn.jpg"],
  INTJ: ["브람스", "설명", "brahms.jpg"],
  INTP: ["베토벤", "설명", "beethoven.jpg"],
  INFJ: ["차이코프스키", "설명", "tchaikovsky.jpg"],
  INFP: ["슈베르트", "설명", "schubert.jpg"],
  ISTJ: ["라흐마니노프", "설명", "rach.jpg"],
  ISTP: ["쇼스타코비치", "설명", "shostakovich.webp"],
  ISFJ: ["쇼팽", "설명", "chopin.jpg"],
  ISFP: ["쇼팽", "설명", "chopin.jpg"],
  ENTX: ["스트라빈스키", "설명", "stravinsky.jpg"],
  ENFX: ["쇤베르크", "설명", "schoenberg.jpg"],
  ESTX: ["바그너", "설명", "wagner.jpg"],
  ESFX: ["스크랴빈", "설명", "scriabin.jpg"],
  INTX: ["프로코피예프", "설명", "prokofiev.jpg"],
  INFX: ["말러", "설명", "mahler.jpg"],
  ISTX: ["라벨", "설명", "ravel.png"],
  ISFX: ["메트너", "설명", "medtner.webp"],
}

export default function MBTISurvey() {
  const [ans, setAnswers] = useState({})
  const [curr, setCurrentQuestion] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [mbtiResult, setResult] = useState("")

  const handleAnswer = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  const calc = () => {
    const d = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0, X: 0 }

    Object.values(ans).forEach((answer) => {
      d[answer]++;
      console.log(d);
      console.log(d.X);
    })

    const type =
      (d.E > d.I ? "E" : "I") +
      (d.S > d.N ? "S" : "N") +
      (d.T > d.F ? "T" : "F") +
      (d.X == 0 ? (d.J > d.P ? "J" : "P") : "X")

    setResult(type)
    setShowResult(true)
    console.log(type);
  }

  const next = () => {
    if (curr < Q.length - 1) {
      setCurrentQuestion(curr + 1)
    } else {
      calc()
    }
  }

  const prev = () => {
    if (curr > 0) {
      setCurrentQuestion(curr - 1)
    }
  }

  const resetForm = () => {
    setAnswers({})
    setCurrentQuestion(0)
    setShowResult(false)
    setResult("")
  }

  const progress = ((curr + 1) / Q.length) * 100

  if (showResult) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="w-full max-w-lg bg-gray-900 rounded-lg shadow-lg p-8">
          <div className="text-center mb-6">
            {/* <h1 className="text-3xl font-bold text-blue-400 mb-2">당신이 피아노 작곡가였다면...</h1> */}
            <p className="text-gray-300">당신이 피아노 작곡가였다면...</p>
          </div>
          <div className="flex items-center text-center flex-col gap-6">
            <Image
            src={`/gameResources/mbti/${mbtiTypes[mbtiResult][2]}`}
            alt={`${"test"}`}
            width={300}
            height={200}
            className="rounded-lg shadow-lg"
            />
            <div className="text-6xl font-bold text-blue-400">{mbtiTypes[mbtiResult][0]}</div>
            <div className="text-xl text-gray-300">{mbtiTypes[mbtiResult][1]}</div>
            <button onClick={resetForm} className="systemBtn mt-6">
              다시하기
            </button>
          </div>
        </div>
      </div>
    )
  }

  const q = Q[curr]
  const isAnswered = ans[q.id] !== undefined
  const imgurl = q.imgsrc

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-gray-900 rounded-lg shadow-lg p-8">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-white">클래식 작곡가 유형 테스트</h1>
            <span className="text-sm text-gray-300">
              {curr + 1} / {Q.length}
            </span>
          </div>
          <div className="w-full h-2 bg-gray-700 rounded overflow-hidden">
            <div className="h-full bg-blue-400 transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">{q.text}</h3>
            <div className="flex justify-center mb-6">
              <Image
                src={imgurl}
                alt={`${q.id}`}
                width={300}
                height={200}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="flex flex-col gap-3">
              {q.options.map((opt, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-2 p-3 rounded-lg border border-gray-600 cursor-pointer transition-colors ${
                    ans[q.id] === opt.value ? "bg-blue-900" : "hover:bg-gray-800"
                  }`}
                  onClick={() => handleAnswer(q.id, opt.value)}
                >
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    value={opt.value}
                    checked={ans[q.id] === opt.value}
                    onChange={() => handleAnswer(q.id, opt.value)}
                    className="m-0"
                  />
                  <label className="flex-1 cursor-pointer text-white">{opt.text}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={prev}
              disabled={curr === 0}
              className={`systemBtn ${
                curr === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-600"
              } bg-gray-700 text-white border border-gray-600`}
            >
              이전 질문
            </button>
            <button
              onClick={next}
              disabled={!isAnswered}
              className={`systemBtn ${
                !isAnswered
                  ? "opacity-50 cursor-not-allowed bg-gray-700 text-gray-400"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {curr === Q.length - 1 ? "결과 보기" : "다음 질문"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
