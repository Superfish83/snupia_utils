"use client";
import { useEffect, useState } from "react";
import { use } from "react";

import Image from "next/image";
import Link from "next/link";

import { TagComposer, TagEra } from "@/components/catalog/catalogItem";
import { DocumentIcon } from "@heroicons/react/24/outline";
import CatalogFooter from "@/components/catalog/catalogFooter";

function MaybeImage({ imageUrl, webImageUrl }) {
  const url =
    imageUrl && imageUrl.length > 0
      ? imageUrl
      : webImageUrl && webImageUrl.length > 0
      ? webImageUrl
      : null;
  const valid = url != null;

  return (
    <div
      className={
        "flex md:w-2/5 h-96 items-center justify-center rounded-lg text-gray-600 border-2 " +
        (!valid && " bg-white")
      }
    >
      {valid ? (
        <Image
          src={url}
          alt="Catalog Item"
          className="w-fit h-full"
          width={200}
          height={200}
        />
      ) : (
        <DocumentIcon className="w-1/2 my-10 h-32" />
      )}
    </div>
  );
}

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
          className="flex p-8 space-x-6 items-center min-h-36 bg-black"
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

      <section className="p-4 md:p-12 mb-8">
        <div className="text-xl mb-4">자료 정보 조회</div>
        {itemJson ? (
          <section
            className="md:flex max-md:space-y-6 md:space-x-6 \
                      rounded-xl w-full min-h-96 text-black text-lg"
          >
            <MaybeImage imageUrl={itemJson.img} webImageUrl={itemJson.webimg} />
            <div className="flex flex-col md:w-2/3 h-full justify-center space-y-3">
              <div className="space-y-1">
                <div className="text-2xl font-bold">{itemJson.title_kor}</div>
                <div className=" text-gray-700">{itemJson.description}</div>
                {itemJson.title_org && (
                  <div className="text-gray-700">
                    {`(원제: ${itemJson.title_org})`}
                  </div>
                )}
              </div>

              <div className="w-full h-0.5 rounded-full my-10 bg-gray-500" />

              <div className="space-y-1">
                <div className="font-bold">
                  출판사:{" "}
                  {itemJson.publisher ? itemJson.publisher : "정보 없음"}
                </div>
                {itemJson.isbn && (
                  <div className="">
                    <span className="font-bold">ISBN: </span> {itemJson.isbn}
                  </div>
                )}
                <div className="">
                  <span className="font-bold">작곡가:</span>{" "}
                  {itemJson.composer_kor}
                  {itemJson.composer_org ? ` (${itemJson.composer_org})` : ""}
                </div>
                <div className="">
                  <span className="font-bold">편곡자:</span>{" "}
                  {itemJson.transcription ? itemJson.transcription : "없음"}
                </div>
                <div className="">
                  <span className="font-bold">시대:</span> {itemJson.era}
                  {itemJson.era_eng ? ` (${itemJson.era_eng})` : ""}
                </div>
              </div>

              <div className="w-full h-0.5 rounded-full my-10 bg-gray-500" />

              <div className="space-y-1">
                <div>
                  <div className="font-bold">수록 작품 목록</div>
                  <div className="text-base text-gray-700 border-2 rounded-xl p-1">
                    {itemJson.opus ? itemJson.opus : "정보 없음"}
                  </div>
                </div>
                <div>
                  <div className="font-bold">비고</div>
                  <div className="text-base text-gray-700 border-2 rounded-xl p-1">
                    {itemJson.desc2 ? itemJson.desc2 : "정보 없음"}
                  </div>
                </div>
              </div>

              <div className="w-full h-0.5 rounded-full my-10 bg-gray-500" />

              <div className="space-y-1">
                <div className="">
                  기증자: {itemJson.doner ? itemJson.doner : "정보 없음"}
                </div>
                <div className="font-bold">
                  보존 상태:{" "}
                  {itemJson.condition == 3 ? (
                    <span className="text-green-600">좋음</span>
                  ) : itemJson.condition == 2 ? (
                    <span className="text-yellow-600">보통</span>
                  ) : itemJson.condition == 1 ? (
                    <span className="text-red-600">나쁨</span>
                  ) : null}
                </div>
              </div>
            </div>
          </section>
        ) : (
          <div className="my-40 text-center">Loading...</div>
        )}
      </section>
      <CatalogFooter />
    </>
  );
}
