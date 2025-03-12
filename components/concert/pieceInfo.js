import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { DM_Serif_Display } from "next/font/google";
const fontDmserif = DM_Serif_Display({ subsets: ["latin"], weight: ["400"] });

export default function PieceInfo({ data }) {
  const [open, setOpen] = useState(false);

  return (
    <AnimatePresence>
      <motion.div
        className={
          "item-center my-4 mx-2 text-lg p-4 border-l-2 border-gray-500 rounded-xl " +
          (open && "bg-gray-950 transition-all")
        }
      >
        <section
          className={"flex items-center cursor-pointer "}
          onClick={() => {
            setOpen(!open);
          }}
        >
          <div className={"text-base " + fontDmserif.className}>
            <div className="text-xl ">{data.composer}</div>
            <div className="">
              {data.title.map((data, key) => (
                <div key={key}>{data}</div>
              ))}
            </div>
            <div className="">
              {data.subtitle.map((data, key) => (
                <div key={key}>{data}</div>
              ))}
            </div>
          </div>
        </section>

        {open && (
          <AnimatePresence mode="sync">
            <div className=" my-2 text-base pt-2">
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-blue-100 text-center my-2"
              >
                <div className="text-lg">연주자: {data.performer_name}</div>
                <div className="text-base">({data.performer_info})</div>
              </motion.div>

              {data.desc1 && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  {data.desc1.map((text, key) => (
                    <div key={key} className="mb-2">
                      {"⠀"}
                      {text}
                    </div>
                  ))}
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-blue-100 text-lg mt-4 mb-2 text-center"
              >
                곡 소개
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {data.desc2.map((text, key) => (
                  <div key={key} className="mb-2">
                    {"⠀"}
                    {text}
                  </div>
                ))}
              </motion.div>
            </div>
          </AnimatePresence>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
