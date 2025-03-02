import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="mt-14 mb-4 mx-auto text-2xl font-bold border-x-4 px-6 py-4 rounded-xl">
        SNUPia utils
      </div>

      <div className="mt-8 mb-2 mx-auto text-xl p-2 border-b-2 ">
        동아리 소개제 웹게임
      </div>

      <Link href={"/sightread"} className="systemBtn">
        오선지 초견 게임
      </Link>
      <Link href={"https://snupia.kr/play/"} className="systemBtn">
        피아노 음악 퀴즈
      </Link>

      <div className="mt-8 mb-2 mx-auto text-xl p-2 border-b-2 ">
        정기연주회
      </div>

      <Link href={"/concert/book-33rd"} className="systemBtn">
        33회 정기연주회 프로그램북
      </Link>
    </div>
  );
}
