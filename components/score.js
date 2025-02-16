import Image from "next/image";

export default function Score({ imgsrc }) {
  return (
    <div className="">
      <Image
        src={`/quizpic/${imgsrc}.jpg`}
        alt="score"
        height={100}
        width={100}
        className="w-40 border-2 border-slate-500"
      />
    </div>
  );
}
