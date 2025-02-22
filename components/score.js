import Image from "next/image";

export default function Score({ imgsrc, keyHitTime }) {
  return (
    <div className="relative">
      <Image
        src={`${imgsrc}`}
        alt="score"
        height={100}
        width={100}
        priority={true}
        placeholder="empty"
        className="w-40 h-40 top-0 left-0"
      />
    </div>
  );
}
