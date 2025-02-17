import Image from "next/image";

export default function Score({ imgsrc }) {
  return (
    <div className="">
      <Image
        src={`/${imgsrc}`}
        alt="score"
        height={100}
        width={100}
        className="h-56 border-2 border-slate-500"
      />
    </div>
  );
}
