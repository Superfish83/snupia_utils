import Image from "next/image";

export default function SnupiaBanner() {
  return (
    <div className="w-full mt-40 mb-40 flex bg-black">
      <div className="text-center mx-auto flex items-center">
        <Image
          src={"/logo.png"}
          alt="snupiaLogo"
          width={180}
          height={154}
          className="w-32 h-32 mx-8"
        />
        <div className="flex flex-col items-center text-white font-bold">
          <div className="text-3xl">동아리 소개제</div>
          <div className="text-xl">오선지 초견 게임</div>
        </div>
      </div>
    </div>
  );
}
