import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function ConcertBanner({ chuksaRef }) {
  const poster = true;
  const [showBtn, setShowBtn] = useState(true);

  const TempPoster = () => (
    <div className="mx-auto text-center mb-8">
      <Image
        src={"/logo.png"}
        alt="logo"
        width={100}
        height={100}
        className="mx-auto w-40 h-40"
      />
      <div className="mx-auto text-4xl font-bold mt-4">제 33회 정기연주회</div>
      <div className="mx-auto text-2xl text-slate-300 font-bold mt-2">
        포스터 들어갈 자리
      </div>
    </div>
  );

  return (
    <section className="w-full h-full relative flex items-center bg-black">
      <AnimatePresence>
        <motion.div
          className="relative mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.5 }}
        >
          {poster ? (
            <Image
              src="/concert/poster.png"
              alt="poster"
              width={1130}
              height={742}
              className="mx-auto my-auto md:h-screen md:w-auto"
            />
          ) : (
            <TempPoster />
          )}
          <div className="absolute top-0 left-0 h-full w-full flex flex-col">
            <div className="w-full h-4/5"></div>
            {showBtn && (
              <motion.div
                className="mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, delay: 1.0 }}
              >
                <button
                  onClick={() => {
                    chuksaRef.current.scrollIntoView({ behavior: "smooth" });
                    setTimeout(() => {
                      setShowBtn(false);
                    }, 500);
                  }}
                  className="rounded-full p-4 text-3xl bg-amber-500 animate-bounce"
                >
                  ▼
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
