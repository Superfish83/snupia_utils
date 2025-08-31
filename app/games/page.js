import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";

const fontE = localFont({
  src: "./Eulyoo1945-Regular.otf",
});
const fontH = localFont({
  src: "HeirofLightOTFRegular.otf",
});

export default function Games() {
  const GamesItem = ({ imgsrc, link, title, description, colorCSS }) => {
    return (
      <Link
        className={
          `flex max-md:flex-col gap-4 p-4 items-center rounded-xl border-2 transition-all w-full ` +
          colorCSS
        }
        href={link}
      >
        <Image
          src={imgsrc}
          width={240}
          height={135}
          alt={title}
          className="rounded-lg"
        />
        <div className="mr-auto ">
          <h3 className="text-2xl font-bold">{title}</h3>
          <p className="text-lg">{description}</p>
        </div>
      </Link>
    );
  };

  return (
    <div
      className={
        "flex flex-col gap-4 bg-[#a47764] text-black py-20 px-8 min-h-screen " +
        fontE.className
      }
    >
      <div className={"text-center font-bold"}>
        <h1 className="text-3xl">2025-2 동아리소개제</h1>
        <h2 className="text-2xl">SNUPia 웹게임</h2>
      </div>

      <br />

      <section className="flex flex-col items-center gap-4 lg:w-1/2 mx-auto">
        <GamesItem
          imgsrc="/gameResources/games/1.jpg"
          link="/games/sightread"
          title="피아노 초견 스피드 게임"
          description="음표를 보고 빠르게 건반을 눌러보세요"
          colorCSS="bg-amber-200 hover:bg-amber-300 text-amber-900 border-amber-400"
        />
        <GamesItem
          imgsrc="/gameResources/games/2.jpg"
          link="/games/guessthemusic"
          title="피아노 음악 퀴즈"
          description="이거 어디서 많이 들어봤는데..."
          colorCSS="bg-red-200 hover:bg-red-300 text-red-900 border-red-400"
        />
        <GamesItem
          imgsrc="/gameResources/games/2.jpg"
          link="/games/mbti"
          title="음악가 MBTI"
          description="나는 어떤 클래식 작곡가일까?"
          colorCSS="bg-orange-200 hover:bg-orange-300 text-orange-900 border-orange-400"
        />
      </section>

      <br />

      <div className="text-center font-bold text-lg">
        스누피아가 궁금하거나 가입하고 싶다면?
      </div>
      <Image
        src="/qr/snupia25-2qr.png"
        width={600}
        height={100}
        alt="snupia qr code"
        className="mx-auto"
      />
      <br />

      <div className="mx-auto text-center">
        <div>웹게임 사이트 제작: SNUPia 집행진 정보부</div>
        <div>김민재, 김연준, 송이안</div>
      </div>
    </div>
  );
}
