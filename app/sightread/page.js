import SnupiaBigBanner from "@/components/sightread/banner";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col">
      <SnupiaBigBanner />

      <section className="mx-auto">
        <Link href="/sightread/tutorial" className="systemBtn">
          게임 시작
        </Link>
      </section>

      <section className="mx-auto mt-16 text-center">
        <div className="my-2 text-lg">
          PC/태블릿 등 가로로 넓은 화면에서 플레이해 주세요.
        </div>
      </section>
    </div>
  );
}
