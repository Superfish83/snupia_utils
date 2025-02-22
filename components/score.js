import Image from "next/image";

export default function Score({ imgsrc, showsrc }) {
  return (
    <Image
      src={`${imgsrc}`}
      alt="score"
      height={100}
      width={100}
      priority={true}
      placeholder="empty"
      className="w-40 h-40 absolute top-0 left-0"
      style={{
        visibility: imgsrc == showsrc ? "visible" : "hidden",
      }}
    />
  );
}
