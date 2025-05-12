"use client";
import { useEffect, useState } from "react";
import CatalogItem, { TagEra } from "@/components/catalog/catalogItem";
import CatalogFooter from "@/components/catalog/catalogFooter";
import SearchHeader from "@/components/catalog/searchHeader";

export default function Catalog() {
  const [catalogData, setCatalogData] = useState(null);
  const [catalogVersion, setCatalogVersion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [displayData, setDisplayData] = useState(null);
  const [displayText, setDisplayText] = useState("전체 자료 목록");

  useEffect(() => {
    async function fetchCatalogData() {
      const res = await fetch("/api/catalog");
      const data = await res.json();
      setCatalogData(data.data);
      setDisplayData(data.data);
      setCatalogVersion(data.version);
      setIsLoading(false);
    }
    fetchCatalogData();
  }, [isLoading]);

  return (
    <>
      <SearchHeader
        loading={isLoading}
        catalogVersion={catalogVersion}
        catalogData={catalogData}
        setDisplayData={setDisplayData}
        setDisplayText={setDisplayText}
        setIsLoading={setIsLoading}
      />
      <article className="p-4 md:p-8 text-black ">
        <div className="text-xl mb-4">{displayText}</div>
        {displayData ? (
          displayData.length > 0 ? (
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayData.map((item, index) =>
                item.id && item.id !== 0 ? (
                  <CatalogItem key={index} itemJson={item} />
                ) : null
              )}
            </section>
          ) : (
            <div className="my-40 text-center">검색 결과가 없습니다.</div>
          )
        ) : (
          <div className="my-40 text-center">Loading...</div>
        )}
      </article>
      <CatalogFooter />
    </>
  );
}
