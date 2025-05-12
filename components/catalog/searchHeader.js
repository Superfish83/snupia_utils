import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useEffect, useState } from "react";

const eras = [
  "바로크",
  "고전",
  "낭만",
  "인상주의",
  "현대",
  "동시대",
  "팝/가요",
  "재즈",
];
const selectedTagCss = {
  바로크: "border-red-800 hover:border-red-700",
  고전: "border-orange-700 hover:border-orange-600",
  낭만: "border-amber-600 hover:border-amber-500",
  인상주의: "border-blue-800 hover:border-blue-700",
  현대: "border-violet-800 hover:border-violet-700",
  동시대: "border-purple-800 hover:border-purple-700",
  "팝/가요": "border-green-800 hover:border-green-700",
  재즈: "border-cyan-800 hover:border-cyan-700",
  "분류 없음": "border-gray-800 hover:border-gray-700",
};
function SearchTagEra({ era, selected, onClick }) {
  const css =
    "my-0.5 mr-1 px-2 py-0.5 rounded-xl w-fit " +
    "transition-all cursor-pointer text-white border-2 " +
    (selected ? selectedTagCss[era] : "border-gray-400 hover:border-gray-500");
  return (
    <button onClick={onClick} className={css}>
      {era}
    </button>
  );
}

export default function SearchHeader({
  loading,
  catalogVersion,
  catalogData,
  setDisplayData,
  setDisplayText,
  setIsLoading,
}) {
  const [searchText, setSearchText] = useState("");
  const [searchTag, setSearchTag] = useState("");

  function getMatch(target, keyword) {
    let a = null;
    let b = null;

    const charsToRemove = " -*+?.,\\^$|#";
    const regex = new RegExp(`[${charsToRemove}]`, "g");

    const reduce = (str) =>
      str
        .toLowerCase()
        .replace(regex, "")
        .replace(/-/g, "")
        .replace(/Ä/g, "ae")
        .replace(/ä/g, "ae")
        .replace(/Ö/g, "oe")
        .replace(/ö/g, "oe")
        .replace(/Ü/g, "ue")
        .replace(/ü/g, "ue")
        .replace(/ß/g, "ss")
        .replace(/ç/g, "c")
        .replace(/ñ/g, "n");

    if (target) {
      a = reduce(target);
    }
    if (keyword) {
      b = reduce(keyword);
    }
    return a?.includes(b);
  }

  function doSearch() {
    setIsLoading(true);

    const doTagSearch = searchTag !== "";
    const doTextSearch = searchText !== "";

    const displayData = catalogData?.filter(
      (item) =>
        (!doTagSearch || item.era === searchTag) &&
        (!doTextSearch ||
          getMatch(item.title_kor, searchText) ||
          getMatch(item.title_org, searchText) ||
          getMatch(item.description, searchText) ||
          getMatch(item.composer_kor, searchText) ||
          getMatch(item.composer_org, searchText) ||
          getMatch(item.performer_kor, searchText))
    );
    //console.log(displayData);
    setDisplayData(displayData);
    if (doTagSearch || doTextSearch)
      setDisplayText(`검색 결과 (${displayData.length}건)`);
    else setDisplayText("전체 자료 목록");
    setIsLoading(false);
  }
  useEffect(() => {
    doSearch();
  }, [searchText, searchTag]);

  return (
    <header className="flex p-4 md:p-8 space-x-6 items-center min-h-36 bg-black">
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

      <section className="space-y-2 px-4">
        <div className="w-full h-fit bg-gray-700 rounded-full px-4 py-2 gap-2 flex items-center">
          <MagnifyingGlassIcon className="w-6 h-6" />
          <input
            type="text"
            className="w-full bg-transparent text-lg"
            placeholder="검색어를 입력하세요(2자 이상)"
            onChange={(e) => {
              if (e.target.value.length >= 2) setSearchText(e.target.value);
              else setSearchText("");
            }}
          />
        </div>
        <div className="flex gap-1">
          {eras.map((era, index) => (
            <SearchTagEra
              key={index}
              era={era}
              selected={era === searchTag}
              onClick={() => {
                if (era === searchTag) setSearchTag(""); // Unselect
                else setSearchTag(era);
              }}
            />
          ))}
        </div>
      </section>
    </header>
  );
}
