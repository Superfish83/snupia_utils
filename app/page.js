import SnupiaBigBanner from "@/components/banner";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col">
      <SnupiaBigBanner />

      <section className="mx-auto">
        <Link href="game/" className="systemBtn">
          게임 시작
        </Link>
      </section>
    </div>
  );
}
