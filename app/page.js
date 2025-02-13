import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col">
      <section className="mx-auto my-40 text-center">
        <div className="font-bold text-3xl">SNUPia 동소제</div>
        <div className="font-bold text-lg">오선지 초견 Quiz</div>
      </section>

      <section className="mx-auto">
        <Link href="quiz/" className="systemBtn">
          게임 시작
        </Link>
      </section>
    </div>
  );
}
