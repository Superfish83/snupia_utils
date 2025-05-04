import Image from "next/image";
import { DocumentIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function TagComposer({ composer }) {
  return (
    <div
      className="my-0.5 mr-1 bg-gray-700 hover:bg-gray-500 transition-all
       px-2 py-0.5 rounded-xl text-sm w-fit"
    >
      {composer}
    </div>
  );
}
export function TagEra({ era }) {
  return (
    <div
      className={
        "my-0.5 mr-1 px-2 py-0.5 rounded-xl text-sm w-fit transition-all " +
        (era == "바로크 시대"
          ? "bg-red-800 hover:bg-red-600"
          : era == "고전 시대"
          ? "bg-orange-700 hover:bg-orange-600"
          : era == "낭만주의"
          ? "bg-amber-600 hover:bg-amber-500"
          : era == "인상주의"
          ? "bg-blue-800 hover:bg-blue-600"
          : era == "현대"
          ? "bg-purple-800 hover:bg-purple-600"
          : era == "팝/가요"
          ? "bg-green-800 hover:bg-green-600"
          : era == "재즈"
          ? "bg-cyan-800 hover:bg-cyan-600"
          : "bg-gray-800 hover:bg-gray-600")
      }
    >
      {era}
    </div>
  );
}
export function MaybeImage({ imageUrl, valid = false }) {
  return (
    <div
      className={
        "flex w-1/3 h-full items-center justify-center rounded-lg" +
        (!valid && " bg-gray-600")
      }
    >
      {valid ? (
        <Image src={imageUrl} alt="Catalog Item" width={200} height={200} />
      ) : (
        <DocumentIcon className="w-1/2 my-10 min-h-32" />
      )}
    </div>
  );
}

export default function CatalogItem({ itemJson }) {
  return (
    <Link
      href={`/catalog/${itemJson.id}`}
      className="flex p-4 space-x-4 border-2 
        border-gray-300 hover:bg-gray-900 transition-all
         rounded-xl w-full min-h-52"
    >
      <MaybeImage imageUrl={"/logo.png"} />
      <div className="flex flex-col w-2/3 h-full justify-center space-y-1">
        <div className="text-xl font-bold">{itemJson.title_kor}</div>
        <div className="text-sm text-gray-300">{itemJson.description}</div>
        <div className="text-sm text-gray-400">{itemJson.publisher}</div>
        <div className="text-sm flex flex-wrap align-center ">
          <TagComposer composer={itemJson.composer_kor} />
          <TagEra era={itemJson.era} />
        </div>
        <div className="text-sm text-gray-300">
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
    </Link>
  );
}
