import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function Piece({ data }) {
  const [open, setOpen] = useState(false);

  const PieceFadeInDiv = ({ delay, className, children }) => (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );

  return (
    <AnimatePresence>
      <div
        delay={0}
        className={`p-4 my-2 rounded-lg shadow-xl border-2 bg-[#927466] hover:bg-[#97796b] transition-all cursor-pointer ${
          open ? "border-[#7d5f51]" : "border-[#8d6f61]"
        }`}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <div className={"flex flex-col gap-2"}>
          {data.piece.map((piece_item, key) => (
            <div key={key} className="text-lg ">
              <p>{`${piece_item.composer} - ${piece_item.title}`}</p>
              <p className="text-sm">{piece_item.movement}</p>
            </div>
          ))}
        </div>

        {open && (
          <AnimatePresence mode="sync">
            <div className="my-2 gap-2">
              <PieceFadeInDiv
                delay={0}
                className={"font-bold text-center text-[#441919]"}
              >
                {data.performer?.name} ({data.performer?.info})
              </PieceFadeInDiv>

              <PieceFadeInDiv delay={0.1} className="flex flex-col gap-2 mb-2">
                {data.intro_performer?.map((text, key) => (
                  <p key={key}>{`⠀${text}`}</p>
                ))}
              </PieceFadeInDiv>

              <PieceFadeInDiv
                delay={0.3}
                className={"font-bold text-center text-[#441919]"}
              >
                곡 소개
              </PieceFadeInDiv>

              <PieceFadeInDiv delay={0.4} className="flex flex-col gap-2">
                {data.intro_piece?.map((text, key) => (
                  <p key={key}>{`⠀${text}`}</p>
                ))}
              </PieceFadeInDiv>
            </div>
          </AnimatePresence>
        )}
      </div>
    </AnimatePresence>
  );
}
