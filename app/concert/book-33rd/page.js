import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="my-20 mx-auto text-2xl font-bold">SNUPia</div>
      <Link href={"/sightread"} className="systemBtn">
        오선지 초견 게임
      </Link>
      <Link href={"/concert/book-33rd"} className="systemBtn">
        33회 정기연주회 프로그램북
      </Link>
    </div>
  );
}
