import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

export default function ConcertBanner() {
  return (
    <section className="w-full h-full relative flex items-center">
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="mx-auto text-center mb-8"
        >
          <Image
            src={"/logo.png"}
            alt="logo"
            width={100}
            height={100}
            className="mx-auto w-40 h-40"
          />
          <div className="mx-auto text-4xl font-bold mt-4">
            제 33회 정기연주회
          </div>
          <div className="mx-auto text-2xl text-slate-300 font-bold mt-2">
            33rd Concert
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
