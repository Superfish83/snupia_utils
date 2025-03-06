"use client";

import { useEffect, useState } from "react";

export default function Ranking() {
  const [rankings, setRankings] = useState([]);
  const [difficulty, setDifficulty] = useState("전체");
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchName, setSearchName] = useState("");
  const [genre, setGenre] = useState("전체");

  // 장르 목록 예시 (실제 사용하는 장르로 변경하세요)
  const genres = ["전체", "classic", "jazz", "korean", "metal"];

  useEffect(() => {
    fetch('/api/getRanks')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRankings(data);
        } else {
          console.error("API에서 배열이 아닌 데이터가 반환되었습니다:", data);
          console.log("반환된 데이터 형식:", typeof data);
          console.log("반환된 데이터 내용:", data);
        }
      })
      .catch(err => console.error("랭킹 데이터를 불러오는 중 오류 발생:", err));
  }, []);

  const filteredRankings = rankings
    .filter(rank => (difficulty === "전체" || rank.difficulty === difficulty))
    .filter(rank => (genre === "전체" || rank.genre === genre))
    .filter(rank => rank.name.includes(searchName))
    .sort((a, b) => sortOrder === "desc" ? b.score - a.score : a.score - b.score);

  return (
    <div className="w-full h-full flex flex-col items-center justify-start p-4">
        <button
          className="absolute top-4 left-4 bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded"
          onClick={() => window.location.href = "/guessthemusic"}
        >          ↩
        </button>
      <h1 className="text-2xl font-bold mb-4">난이도별 랭킹</h1>

      <div className="flex flex-col items-center mb-4">
        <select
          className="systemInput mb-2 text-black"
          value={difficulty}
          onChange={e => setDifficulty(e.target.value)}
        >
          <option value="전체">전체 난이도</option>
          <option value="입문자">입문자</option>
          <option value="보통">보통</option>
          <option value="고수">고수</option>
          <option value="작곡가">작곡가</option>
          <option value="악마">악마</option>
          <option value="미친">미친</option>
        </select>

        <select
          className="systemInput mb-2 text-black"
          value={genre}
          onChange={e => setGenre(e.target.value)}
        >
          <option value="전체">전체 장르</option>
          <option value="classic">클래식</option>
          <option value="jazz ">재즈</option>
          <option value="korean">한국가요</option>
          <option value="metal">메탈</option>
        </select>

        <button
          className="systemBtn mb-2"
          onClick={() => setSortOrder(prev => prev === "desc" ? "asc" : "desc")}
        >
          정렬: {sortOrder === "desc" ? "내림차순" : "오름차순"}
        </button>

        <input
          className="systemInput mb-2 text-black"
          placeholder="이름 검색"
          value={searchName}
          onChange={e => setSearchName(e.target.value)}
        />
      </div>

      <div className="w-full overflow-auto">
        <table className="w-full text-center">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">순위</th>
              <th className="p-2">이름</th>
              <th className="p-2">학번</th>
              <th className="p-2">과</th>
              <th className="p-2">장르</th>
              <th className="p-2">난이도</th>
              <th className="p-2">점수</th>
            </tr>
          </thead>
          <tbody>
            {filteredRankings.map((rank, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{rank.name}</td>
                <td className="p-2">{rank.studentId}</td>
                <td className="p-2">{rank.department}</td>
                <td className="p-2">{rank.genre}</td>
                <td className="p-2">{rank.difficulty}</td>
                <td className="p-2">{rank.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredRankings.length === 0 && (
          <div className="text-center mt-4">검색 결과가 없습니다.</div>
        )}
      </div>
    </div>
  );
}