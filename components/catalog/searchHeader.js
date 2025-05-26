import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useEffect, useState } from "react";

const eras = [
  "바로크",
  "고전",
  "낭만",
  "인상주의",
  "근대",
  "현대",
  "팝/뉴에이지",
  "재즈",
];
const selectedTagCss = {
  바로크: "border-red-800 hover:border-red-700",
  고전: "border-orange-700 hover:border-orange-600",
  낭만: "border-amber-600 hover:border-amber-500",
  인상주의: "border-blue-800 hover:border-blue-700",
  근대: "border-violet-800 hover:border-violet-700",
  현대: "border-purple-800 hover:border-purple-700",
  "팝/뉴에이지": "border-green-800 hover:border-green-700",
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
  isLoading,
  catalogVersion,
  searchText,
  setSearchText,
  searchTag,
  setSearchTag,
}) {
  const [barContent, setBarContent] = useState("");
  useEffect(() => {
    setBarContent(searchText);
  }, [searchText]);

  function handleSearch() {
    if (barContent.length <= 1) {
      alert("검색어는 2글자 이상 입력해주세요.");
      return;
    } else setSearchText(barContent.trim());
  }
  return (
    <header className="max-lg:p-8 max-lg:space-y-4 lg:flex lg:p-8 items-center min-h-36 bg-black">
      <button
        className="flex items-center space-x-6 text-left"
        onClick={() => {
          setSearchText("");
          setSearchTag("");
        }}
      >
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
            SNUPia 동아리방의 소장 악보 목록입니다.
          </div>
          <div className="text-sm text-gray-400">
            Version: {!isLoading ? catalogVersion : "Loading..."}
          </div>
        </div>
      </button>

      <section className="space-y-2 lg:ml-auto">
        <div className="w-full h-fit bg-gray-700 rounded-full px-4 py-2 gap-2 flex items-center">
          <input
            type="text"
            className="w-full bg-transparent"
            placeholder="검색어를 입력하세요(ex: 리스트, 소나타, ...)"
            value={barContent}
            onChange={(e) => {
              setBarContent(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
                e.currentTarget.blur();
              }
            }}
          />
          <XMarkIcon
            className="w-6 h-6 cursor-pointer text-gray-300 hover:text-gray-200  bg-gray-500 rounded-full"
            onClick={() => {
              setBarContent("");
              setSearchText("");
            }}
          />{" "}
          <button onClick={handleSearch}>
            <MagnifyingGlassIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="flex flex-wrap gap-1 max-sm:justify-center">
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
