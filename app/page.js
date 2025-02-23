import SnupiaBigBanner from "@/components/banner";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col">
      <SnupiaBigBanner />

      <section className="mx-auto">
        <Link href="/tutorial" className="systemBtn">
          게임 시작
        </Link>
      </section>

      <section className="mx-auto mt-16 text-center">
        <div className="my-2 text-lg">
          PC/태블릿 등 가로로 넓은 화면에서 플레이해 주세요.
        </div>
        <div className="text-slate-400">게임 제작: 김연준 (컴퓨터공학부)</div>
      </section>
    </div>
  );
}
