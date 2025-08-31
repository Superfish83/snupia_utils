"use client"

import { useState } from "react"
import Image from "next/image"

const Q = [
  {
    id: 1,
    text: "1",
    imgsrc: "/gameResources/mbti/test.png",
    options: [
      { value: "E", text: "1" },
      { value: "I", text: "2" },
    ],
  },
  {
    id: 2,
    text: "2",
    imgsrc: "/gameResources/mbti/test.png",
    options: [
      { value: "S", text: "1" },
      { value: "N", text: "2" },
    ],
  },
  {
    id: 3,
    text: "3",
    imgsrc: "/gameResources/mbti/test.png",
    options: [
      { value: "T", text: "1" },
      { value: "F", text: "2" },
    ],
  },
  {
    id: 4,
    text: "4",
    imgsrc: "/gameResources/mbti/test.png",
    options: [
      { value: "J", text: "1" },
      { value: "P", text: "2" },
    ],
  },
]

const mbtiTypes = {
  INTJ: ["INTJ", "설명"],
  INTP: ["INTP", "설명"],
  ENTJ: ["ENTJ", "설명"],
  ENTP: ["ENTP", "설명"],
  INFJ: ["INFJ", "설명"],
  INFP: ["INFP", "설명"],
  ENFJ: ["ENFJ", "설명"],
  ENFP: ["ENFP", "설명"],
  ISTJ: ["ISTJ", "설명"],
  ISFJ: ["ISFJ", "설명"],
  ESTJ: ["ESTJ", "설명"],
  ESFJ: ["ESFJ", "설명"],
  ISTP: ["ISTP", "설명"],
  ISFP: ["ISFP", "설명"],
  ESTP: ["ESTP", "설명"],
  ESFP: ["ESFP", "설명"],
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
    const d = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }

    Object.values(ans).forEach((answer) => {
      d[answer]++
    })

    const type =
      (d.E > d.I ? "E" : "I") +
      (d.S > d.N ? "S" : "N") +
      (d.T > d.F ? "T" : "F") +
      (d.J > d.P ? "J" : "P")

    setResult(type)
    setShowResult(true)
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
            src={"/gameResources/mbti/test.png"}
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
