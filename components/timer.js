import { useEffect, useState } from "react";

export default function Timer({ seconds, barSize, setGameStatus }) {
  const [msLeft, setMsLeft] = useState(100000);
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    setStartTime(Date.now());
    setMsLeft(seconds * 1000);
  }, []);

  useEffect(() => {
    if (msLeft < 0.0) {
      setGameStatus(2);
      return;
    }

    setTimeout(() => {
      const elapsed_ms = Date.now() - startTime;
      setMsLeft(1000 * seconds - elapsed_ms);
    }, 50);
  }, [msLeft]);

  return (
    <div className="w-full flex items-center">
      <div className="mx-4 font-bold">
        남은 시간: {Math.ceil(msLeft / 1000)}초
      </div>
      <div className="flex bg-gray-800 rounded-lg">
        <div
          className="bg-cyan-300 rounded-lg"
          style={{
            width: `${barSize * (msLeft / (seconds * 1000))}px`,
            height: `14px`,
          }}
        />
        <div
          className="bg-gray-800 rounded-lg"
          style={{
            width: `${barSize * (1 - msLeft / (seconds * 1000))}px`,
            height: `14px`,
          }}
        />
      </div>
    </div>
  );
}
