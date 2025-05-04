"use client";
import { useEffect, useState } from "react";
import { use } from "react";

import Image from "next/image";
import Link from "next/link";

import {
  TagComposer,
  TagEra,
  MaybeImage,
} from "@/components/catalog/catalogItem";

export default function CatalogId({ params }) {
  const { id } = use(params);
  const [itemJson, setItemJson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItemData() {
      const res = await fetch(`/api/catalog?id=${id}`);
      const data = await res.json();
      setItemJson(data);
      setLoading(false);
    }
    fetchItemData();
  }, [id, loading]);

  return (
    <>
      <header>
        <Link
          href="/catalog"
          className="flex p-8 space-x-6 items-center min-h-36 bg-gray-900"
        >
          <Image
            src="/logo.png"
            alt="SNUPia Logo"
            width={100}
            height={100}
            className="w-24 rounded-3xl"
          />
          <div className="space-y-0.5">
            <div className="text-3xl font-bold">SNUPia Catalog</div>
            <div className="text-xl">
              SNUPia 동아리방의 소장 자료 목록입니다.
            </div>
          </div>
        </Link>
      </header>

      <section className="p-4 md:p-12 ">
        <div className="text-xl mb-4">자료 정보 조회</div>
        {itemJson ? (
          <section className="flex space-x-4 rounded-xl w-full min-h-96">
            <MaybeImage imageUrl={"/logo.png"} />
            <div className="flex flex-col w-2/3 h-full justify-center space-y-3">
              <div className="space-y-1">
                <div className="text-2xl font-bold">{itemJson.title_kor}</div>
                {itemJson.title_org && (
                  <div className="text-gray-300">
                    원제: {itemJson.title_org}
                  </div>
                )}
                <div className=" text-gray-300">{itemJson.description}</div>
              </div>

              <div className="w-full h-0.5 rounded-full my-10 bg-gray-500" />

              <div className="space-y-1">
                <div className="flex items-center">
                  작곡가: <TagComposer composer={itemJson.composer_kor} />{" "}
                  {itemJson.composer_org && (
                    <div className="text-gray-300">
                      ({itemJson.composer_org})
                    </div>
                  )}
                </div>
                <div className="">
                  편곡자:{" "}
                  {itemJson.transcription ? itemJson.transcription : "없음"}
                </div>
                <div className="flex items-center">
                  시대: <TagEra era={itemJson.era} />
                </div>
              </div>

              <div className="w-full h-0.5 rounded-full my-10 bg-gray-500" />

              <div className="space-y-1">
                <div className="">
                  출판사:{" "}
                  {itemJson.publisher ? itemJson.publisher : "정보 없음"}
                </div>
                <div className="">
                  ISBN: {itemJson.isbn ? itemJson.isbn : "정보 없음"}
                </div>
                <div>
                  수록 작품 목록:
                  <div className="text-sm text-gray-300 p-1">
                    {itemJson.opus ? itemJson.opus : "정보 없음"}
                  </div>
                </div>
                <div>
                  비고:
                  <div className="text-sm text-gray-300 p-1">
                    {itemJson.desc2 ? itemJson.desc2 : "정보 없음"}
                  </div>
                </div>
              </div>

              <div className="w-full h-0.5 rounded-full my-10 bg-gray-500" />

              <div className="space-y-1">
                <div className="">
                  기증자: {itemJson.doner ? itemJson.doner : "정보 없음"}
                </div>
                <div>
                  보존 상태:{" "}
                  {itemJson.condition == 3 ? (
                    <span className="text-green-300">양호</span>
                  ) : itemJson.condition == 2 ? (
                    <span className="text-yellow-300">보통</span>
                  ) : itemJson.condition == 1 ? (
                    <span className="text-red-300">나쁨</span>
                  ) : null}
                </div>
              </div>
            </div>
          </section>
        ) : (
          <div className="my-40 text-center">Loading...</div>
        )}
      </section>
    </>
  );
}
