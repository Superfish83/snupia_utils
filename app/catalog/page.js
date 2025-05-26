"use client";
import { useEffect, useRef, useState } from "react";
import CatalogItem from "@/components/catalog/catalogItem";
import CatalogFooter from "@/components/catalog/catalogFooter";
import SearchHeader from "@/components/catalog/searchHeader";

import { getInstr, getMatch } from "@/functions/getMatch";

export default function Catalog() {
  const [catalogData, setCatalogData] = useState(null);
  const [catalogVersion, setCatalogVersion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [searchText, setSearchText] = useState("");
  const [searchTag, setSearchTag] = useState("");

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

  useEffect(() => {
    function doSearch() {
      setIsLoading(true);

      const doTagSearch = searchTag !== "";
      const doTextSearch = searchText !== "";

      const displayData = catalogData?.filter((item) => {
        const tagFilter = !doTagSearch || item.era === searchTag;

        const textFilter =
          !doTextSearch ||
          getMatch(item.title_kor, searchText) ||
          getMatch(item.title_org, searchText) ||
          getMatch(item.description, searchText) ||
          getMatch(item.composer_kor, searchText) ||
          getMatch(item.composer_org, searchText) ||
          getMatch(item.performer_kor, searchText) ||
          getMatch(item.transcription, searchText) ||
          getMatch(item.publisher, searchText) ||
          getMatch(item.doner, searchText) ||
          (item.isInstr == "Y" && getInstr(searchText));
        return tagFilter && textFilter;
      });
      //console.log(displayData);
      setDisplayData(displayData);
      if (doTagSearch || doTextSearch)
        setDisplayText(`검색 결과 (${displayData.length}건)`);
      else setDisplayText("전체 자료 목록");
      setIsLoading(false);
    }
    if (searchText.length != 1) doSearch();
  }, [searchText, searchTag]);

  const topRef = useRef(null);
  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView();
    }
  }, [searchText, searchTag]);

  return (
    <>
      <div ref={topRef} />
      <SearchHeader
        isLoading={isLoading}
        catalogVersion={catalogVersion}
        catalogData={catalogData}
        searchText={searchText}
        setSearchText={setSearchText}
        searchTag={searchTag}
        setSearchTag={setSearchTag}
      />
      <article className="p-4 md:p-8 text-black ">
        <div className="text-xl mb-4">{displayText}</div>
        {displayData ? (
          displayData.length > 0 ? (
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayData.map((item, index) =>
                item.id && item.id !== 0 ? (
                  <CatalogItem
                    key={index}
                    itemJson={item}
                    setSearchText={setSearchText}
                    setSearchTag={setSearchTag}
                  />
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
