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
    <div>
      <div
        className="h-1 w-full bg-gradient-to-r from-green-600 to-amber-500"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 40,
        }}
      />
      <div
        className="h-1 w-full bg-gradient-to-r from-green-600 to-amber-500 rounded-full"
        style={{
          position: "fixed",
          top: 3,
          left: 0,
          zIndex: 40,
        }}
      />
      <div
        className="h-2 bg-gradient-to-r bg-[#8d6f61]"
        style={{
          position: "fixed",
          top: 0,
          left: `${scrollPercentage}%`,
          width: `${100 - scrollPercentage}%`,
          zIndex: 50,
        }}
      />
    </div>
  );
}
