import localFont from "next/font/local";

const fontNanumMyeongjo = localFont({
  src: "./NanumMyeongjo.otf",
});

export const metadata = {
  title: "SNUPia Utils",
  description: "SNUPia Utils",
};

export default function RootLayout({ children }) {
  return (
    <section
      className={`${fontNanumMyeongjo.className} antialiased bg-white`}
      id="catalog"
    >
      {children}
    </section>
  );
}
