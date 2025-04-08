import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  const GameSection = () => (
    <>
      <div className="mt-8 mb-2 mx-auto text-xl p-2 border-b-2 ">
        동아리 소개제 웹게임
      </div>
      <section className="flex items-center mt-10">
        <div className="ml-auto mr-4 flex flex-col">
          <Image
            src="/gameResources/games/1.jpg"
            alt="game1"
            width={640}
            height={360}
            className="w-80 rounded-xl"
          />
          <Link href={"/games/sightread"} className="systemBtn mx-auto mt-4">
            피아노 초견 스피드 게임
          </Link>
        </div>

        <div className="mr-auto ml-4 flex flex-col">
          <Image
            src="/gameResources/games/2.jpg"
            alt="game2"
            width={640}
            height={360}
            className="w-80 rounded-xl"
          />
          <Link
            href={"/games/guessthemusic"}
            className="systemBtn mx-auto mt-4"
          >
            피아노 음악 퀴즈
          </Link>
        </div>
      </section>
      <div className="mx-auto mt-10 text-slate-400">
        웹게임 제작: SNUPia 집행부 김민재, 김연준
      </div>
      <Link href={"/games/qr"} className="mx-auto mt-4 text-blue-400">
        QR codes
      </Link>
    </>
  );

  return (
    <div className="w-full h-full flex flex-col">
      <div className="mt-14 mb-4 mx-auto text-2xl font-bold border-x-4 px-6 py-4 rounded-xl">
        SNUPia utils
      </div>

      <GameSection />
    </div>
  );
}
