import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function PieceInfo({ data }) {
  const [open, setOpen] = useState(false);

  return (
    <AnimatePresence>
      <motion.div className="w-full item-center my-1 text-lg p-2 border-b-2 border-slate-400">
        <section
          className="flex items-center"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <div>
            <div className="font-bold text-sm text-slate-200">
              {data.composer}
            </div>
            <div className="font-bold">{data.title}</div>
            <div className="flex items-center">
              <div className="">{data.performer_name} </div>
              <div className="text-slate-400 text-sm ml-1 mt-1">
                ({data.performer_info})
              </div>
            </div>
          </div>
          {data.desc1 && (
            <div className="text-slate-400 ml-auto">{open ? "▲" : "▼"}</div>
          )}
        </section>

        {open && data.desc1 && (
          <AnimatePresence mode="sync">
            <div className="border-t-2 text-slate-200 border-slate-700 my-2 text-base pt-2">
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-blue-200 text-lg text-center my-2"
              >
                연주자 인삿말
              </motion.div>

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

              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-blue-200 text-lg mt-4 mb-2 text-center"
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
