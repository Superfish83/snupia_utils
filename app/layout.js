import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  // preload: true, 기본값
  subsets: ["latin"], // 또는 preload: false
  weight: ["100", "400", "700", "900"], // 가변 폰트가 아닌 경우, 사용할 fontWeight 배열
});

export const metadata = {
  title: "오선지 초견 게임",
  description: "2025-1 SNUPia 동아리소개제",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${notoSansKr.className} antialiased`}>{children}</body>
    </html>
  );
}
