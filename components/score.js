import Image from "next/image";

export default function Score({ imgsrc }) {
  return (
    <div className="">
      <Image
        src={`${imgsrc}`}
        alt="score"
        height={100}
        width={100}
        className="w-40 h-44"
      />
    </div>
  );
}
