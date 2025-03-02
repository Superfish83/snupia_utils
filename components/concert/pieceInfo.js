import { AnimatePresence, motion } from "framer-motion";

export default function PieceInfo({ data }) {
  return (
    <AnimatePresence>
      <motion.div className="w-full h-40 md:flex item-center text-lg px-4">
        <div>{data.title}</div>
        <div className="ml-auto">{data.performer_name}</div>
      </motion.div>
    </AnimatePresence>
  );
}
