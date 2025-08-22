"use client";

import { useEffect, useState } from "react";

export default function ScrollProgressBar() {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / scrollHeight) * 100;
      setScrollPercentage(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="h-3 bg-gradient-to-r from-amber-400 to-amber-500 border-b-4 border-[#a47764] rounded-full "
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: `${scrollPercentage}%`,
        zIndex: 50,
        transition: "width 0.1s ease-out",
      }}
    />
  );
}
