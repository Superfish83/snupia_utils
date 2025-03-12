import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function ConcertBanner({ chuksaRef }) {
  const poster = true;
  const [showBtn, setShowBtn] = useState(true);

  const blurredPoster =
    "data:image/jpeg;base64,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";

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
    <AnimatePresence>
      <section className="w-full h-full relative flex items-center">
        <motion.div
          className="relative mx-auto h-full w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.5 }}
        >
          <div className="text-center text-lg mb-4 mt-16">
            <div>SNUPia 제33회 정기연주회 </div>
            <div className="text-xl">온라인 프로그램 북</div>
          </div>
          <Image
            src="/concert/poster.jpg"
            alt="poster"
            width={1130}
            height={742}
            className="h-2/3 rounded-xl object-contain p-4"
            placeholder="blur"
            blurDataURL={blurredPoster}
          />
          <div className="absolute top-0 left-0 h-full w-full flex flex-col">
            <div className="w-full h-4/5"></div>
            {showBtn && (
              <motion.div
                className="mx-auto"
                initial={{ opacity: 0, y: 0 }}
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
                  className="rounded-full px-4 py-3 text-center text-2xl bg-indigo-900 animate-bounce"
                >
                  {"▼"}
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </section>
    </AnimatePresence>
  );
}
