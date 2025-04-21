"use client";

import { useState } from "react";
import { LinkIcon } from "@heroicons/react/24/outline";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [memberData, setMemberData] = useState(null);

  async function searchMember(name, num) {
    const params = {
      name: name,
      num: num,
    };
    const url = `/api/memberInfo?${new URLSearchParams(params).toString()}`;
    const jsonData = await fetch(url).then((data) => data.json());

    console.log(jsonData);

    setMemberData(jsonData);
  }

  const SearchResult = () => {
    return (
      <div className="max-w-md mx-auto mt-10 text-center space-y-2">
        <div className="font-bold text-lg text-red-200">
          기능 준비 중입니다.
        </div>
      </div>
    );
    /*
    if (memberData == null) return null;
    if (memberData.error)
      return (
        <div className="max-w-md mx-auto mt-10 text-center space-y-2">
          <div>정보를 찾을 수 없습니다. 입력을 확인해주세요.</div>
          <div>문제가 계속 발생할 경우 SNUPia 집행진에게 문의해 주세요.</div>
        </div>
      );
    else
      return (
        <div className="max-w-md mx-auto mt-10 text-center space-y-10">
          <section className="space-y-2">
            <div className="text-2xl">
              {memberData.name} 님은{" "}
              <span className="font-bold text-blue-200">
                {memberData.memClass}
              </span>
              입니다.
            </div>
            <div>
              ({memberData.major}, {memberData.hakBeon}학번)
            </div>
          </section>
          {memberData.memClass.slice(0, 3) == "휴회원" ? (
            <section className="space-y-1 text-xl">
              <div>
                휴회원 전환 학기:{" "}
                <span className="text-red-200 font-bold">
                  {memberData.restSemester}
                </span>
              </div>
              <div>
                활동점수(누적):{" "}
                <span className="text-red-200 font-bold">
                  {memberData.scoreTotal}점
                </span>
              </div>
            </section>
          ) : (
            <section className="space-y-1 text-xl">
              <div>
                활동점수(누적):{" "}
                <span className="text-red-200 font-bold">
                  {memberData.scoreTotal}점
                </span>
              </div>
              <div>
                활동점수(이번 학기):{" "}
                <span className="text-red-200 font-bold">
                  {memberData.scoreNow}점
                </span>
              </div>
            </section>
          )}
          <section className="space-y-1 text-slate-400">
            <div>명부 최종 업데이트: 2024.9.10.</div>
          </section>
        </div>
      );*/
  };

  const SearchBar = ({ onSearch }) => {
    const [name, setName] = useState("");
    const [num, setNum] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();
      onSearch(name, num);
    };

    return (
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md mx-auto my-5 flex flex-col"
      >
        <div className="mx-auto flex max-md:flex-col items-center md:space-x-2 max-md:space-y-2">
          <div>
            <div className="w-40 px-3 py-1 rounded-xl text-white">이름</div>
            <input
              type="text"
              className="w-40 px-4 py-2 rounded-xl bg-slate-800"
              placeholder="홍길동"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <div className="w-40 px-3 py-1 rounded-xl text-white">
              전화번호 뒷자리
            </div>
            <input
              type="text"
              className="w-40 px-4 py-2 rounded-xl bg-slate-800"
              placeholder="1234"
              value={num}
              onChange={(e) => setNum(e.target.value)}
            />
          </div>
          <div>
            <div className="w-24 px-3 py-1 text-black">.</div>
            <div
              type="submit"
              className="w-24 bg-slate-600 px-4 py-2 rounded-xl hover:bg-slate-700 transition-all text-center"
            >
              검색
            </div>
          </div>
        </div>
      </form>
    );
  };

  return (
    <div className="w-full flex flex-col">
      <Link
        href={"https://snupia.kr"}
        className="mx-auto mt-20 mb-4 flex items-center space-x-4"
      >
        <Image
          src={"/logo.png"}
          alt="snupialogo"
          width={100}
          height={100}
          className="w-20"
        />
        <div className={"mx-auto mt-4 text-2xl md:text-3xl font-bold"}>
          회원 등급 확인
        </div>
      </Link>

      <Image
        src={"/member_class_info.jpg"}
        alt="member_class_info"
        width={800}
        height={800}
        className="mx-auto max-w-96 my-4"
      />
      <Link
        className="text-blue-300 mx-auto my-4 font-bold text-lg underline flex items-center"
        href="/member_class_info.pdf"
      >
        <LinkIcon className="w-6 h-6 mx-2" /> 고화질로 읽기 (PDF)
      </Link>
      <div className={"mx-auto mt-12 text-xl font-bold"}>회원 등급 조회</div>
      <SearchBar onSearch={searchMember} />
      <SearchResult />
      <div className="h-32" />
    </div>
  );
}
