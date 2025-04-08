import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="mt-14 mb-4 mx-auto text-2xl font-bold border-x-4 px-6 py-4 rounded-xl">
        서울대학교 중앙 피아노 동아리 SNUPia
      </div>

      <section className="flex items-center mt-10">
        <div className="ml-auto mr-12 flex flex-col">
          <Image
            src="/qr/snupiainsta.svg"
            alt="link1"
            width={640}
            height={360}
            className="w-64 rounded-xl"
          />
          <div className="mx-auto mt-4 text-xl font-bold">인스타그램 링크</div>
        </div>

        <div className="mr-auto ml-12 flex flex-col">
          <Image
            src="/qr/snupiaform.svg"
            alt="link2"
            width={640}
            height={360}
            className="w-64 rounded-xl"
          />
          <div className="mx-auto mt-4  text-xl font-bold">입부 신청 링크</div>
        </div>
      </section>
      <Link href={"/games"} className="systemBtn mx-auto mt-10">
        게임 시작 화면으로
      </Link>
    </div>
  );
}
