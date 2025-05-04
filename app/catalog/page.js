"use client";
import { useEffect, useState } from "react";
import CatalogItem from "@/components/catalog/catalogItem";
import Image from "next/image";
import Link from "next/link";

export default function Catalog() {
  const [catalogData, setCatalogData] = useState(null);
  const [catalogVersion, setCatalogVersion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCatalogData() {
      const res = await fetch("/api/catalog");
      const data = await res.json();
      setCatalogData(data.data);
      setCatalogVersion(data.version);
      setLoading(false);
    }
    fetchCatalogData();
  }, [loading]);

  return (
    <>
      <header className="flex p-4 md:p-8 space-x-6 items-center min-h-36 bg-gray-900">
        <Image
          src="/logo.png"
          alt="SNUPia Logo"
          width={100}
          height={100}
          className="w-24 rounded-3xl"
        />
        <div className="space-y-0.5">
          <div className="text-xl md:text-3xl font-bold">SNUPia Catalog</div>
          <div className="text-sm md:text-xl">
            SNUPia 동아리방의 소장 자료 목록입니다.
          </div>
          <div className="text-sm text-gray-400">
            Version: {!loading ? catalogVersion : "Loading..."}
          </div>
        </div>
      </header>
      <article className="p-4 md:p-8 ">
        <div className="text-xl mb-4">전체 검색 결과</div>
        {catalogData ? (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {catalogData.map((item, index) =>
              item.id && item.id !== 0 ? (
                <CatalogItem key={index} itemJson={item} />
              ) : null
            )}
          </section>
        ) : (
          <div className="my-40 text-center">Loading...</div>
        )}
      </article>
      <footer className="flex px-4 md:px-8 py-8 items-center ">
        <div className="space-y-1 text-sm">
          <div className="">
            위 자료들은 SNUPia 동아리방(63동 학생회관 428호)에서 열람
            가능합니다! 원하시는 자료가 없다면{" "}
            <span>
              <Link href={"https://imslp.org"} className="text-blue-300">
                IMSLP
              </Link>
            </span>
            를 이용해 보세요.
          </div>
          <div>
            자료 구입 요청 또는 기증은 SNUPia 집행진에게 문의 바랍니다.{" "}
            <span>
              <Link href={"https://snupia.kr"} className="text-blue-300">
                동아리 홈페이지
              </Link>
            </span>
          </div>
          <div className="text-gray-400">
            카탈로그 페이지 관리자: 김연준 (kyjun0803@snu.ac.kr)
          </div>
        </div>
      </footer>
    </>
  );
}
