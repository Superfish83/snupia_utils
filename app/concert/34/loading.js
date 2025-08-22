import Image from "next/image";

export default function Loading() {
  return (
    <div className="w-screen h-screen flex items-center">
      <div className="mx-auto flex flex-col animate-pulse">
        <Image
          src={"/logo.png"}
          alt="logo"
          width={100}
          height={100}
          className="mx-auto w-16 h-16 my-2"
        />
        <div>loading...</div>
      </div>
    </div>
  );
}
