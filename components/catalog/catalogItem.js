import Image from "next/image";
import { DocumentIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const tagCss = {
  바로크: "bg-red-800 hover:bg-red-700",
  고전: "bg-orange-700 hover:bg-orange-600",
  낭만: "bg-amber-600 hover:bg-amber-500",
  인상주의: "bg-blue-800 hover:bg-blue-700",
  현대: "bg-violet-800 hover:bg-violet-700",
  동시대: "bg-purple-800 hover:bg-purple-700",
  "팝/가요": "bg-green-800 hover:bg-green-700",
  재즈: "bg-cyan-800 hover:bg-cyan-700",
  "분류 없음": "bg-gray-800 hover:bg-gray-700",
};

function TagComposer({ composer, setSearchText }) {
  return (
    <div
      onClick={(e) => {
        e.preventDefault(); // Prevent <Link> behavior
        e.stopPropagation(); // Prevent parent <Link> click
        setSearchText(composer);
      }}
      className="my-0.5 mr-1 bg-gray-800 hover:bg-gray-700 text-white cursor-pointer transition-all
       px-2 py-0.5 rounded-xl w-fit"
    >
      {composer}
    </div>
  );
}

function TagEra({ era, setSearchTag, setSearchText }) {
  return (
    <div
      onClick={(e) => {
        e.preventDefault(); // Prevent <Link> behavior
        e.stopPropagation(); // Prevent parent <Link> click
        setSearchTag(era);
        setSearchText("");
      }}
      className={
        "my-0.5 mr-1 px-2 py-0.5 rounded-xl w-fit " +
        "transition-all cursor-pointer text-white " +
        tagCss[era]
      }
    >
      {era}
    </div>
  );
}
function ItemMaybeImage({ imageUrl, webImageUrl }) {
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
        "flex w-1/3 h-full items-center justify-center rounded-lg text-gray-600 border-2 border-gray-600" +
        (!valid && " bg-white")
      }
    >
      {valid ? (
        <Image src={url} alt="Catalog Item" width={200} height={200} />
      ) : (
        <DocumentIcon className="w-1/2 my-10 min-h-32" />
      )}
    </div>
  );
}

export default function CatalogItem({ itemJson, setSearchText, setSearchTag }) {
  return (
    <Link
      href={`/catalog/${itemJson.id}`}
      className="flex p-4 space-x-4 border-2 
        border-gray-800 hover:bg-gray-100 transition-all
         rounded-xl w-full min-h-52"
    >
      <ItemMaybeImage imageUrl={itemJson.img} webImageUrl={itemJson.webimg} />
      <div className="flex flex-col w-2/3 h-full justify-center space-y-1 text-black">
        <div className="text-xl font-bold">{itemJson.title_kor}</div>
        <div className="text-sm text-gray-700">{itemJson.description}</div>
        <div className="text-sm text-gray-700 font-bold">
          {itemJson.publisher}
        </div>
        <div className="text-sm flex flex-wrap align-center ">
          <TagComposer
            composer={itemJson.composer_kor}
            setSearchText={setSearchText}
          />
          <TagEra
            era={itemJson.era}
            setSearchTag={setSearchTag}
            setSearchText={setSearchText}
          />
        </div>
        <div className="font-bold text-gray-700">
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
    </Link>
  );
}
