import Image from "next/image";
import { useEffect, useState } from "react";

export default function Score({ imgsrc, keyHitTime }) {
  const [msElapsed, setMsElapsed] = useState(-1);
  const [greenOpacity, setGreenOpacity] = useState(0.0);

  useEffect(() => {
    setGreenOpacity(
      msElapsed > 0 ? Math.min(1, Math.max(0, 1 - (msElapsed - 200) / 300)) : 0
    );
    setTimeout(() => {
      setMsElapsed(Date.now() - keyHitTime);
    }, 50);
  }, [msElapsed]);

  return (
    <div className="relative">
      <Image
        src={`${imgsrc}`}
        alt="score"
        height={100}
        width={100}
        priority={true}
        className="w-40 h-40 top-0 left-0"
      />
      <div
        style={{ opacity: greenOpacity }}
        className="bg-green-600 w-40 h-40 absolute top-0 left-0 flex items-center"
      >
        <div className="mx-auto font-bold text-xl text-white">정답!</div>
      </div>
    </div>
  );
}
