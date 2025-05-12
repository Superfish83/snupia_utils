import Link from "next/link";

export default function CatalogFooter() {
  return (
    <footer className="flex px-4 md:px-8 py-8 items-center bg-black">
      <div className="space-y-1 text-sm">
        <div className="">
          본 카탈로그의 자료들은 SNUPia 동아리방(63동 학생회관 428호)에서 열람
          가능합니다! 원하시는 자료가 없다면{" "}
          <span>
            <Link href={"https://imslp.org"} className="text-blue-300">
              IMSLP
            </Link>
          </span>
          를 이용해 보세요.
        </div>
        <div>
          자료 구입 요청 또는 기증은 SNUPia 집행진에게 문의 바랍니다.{" "}
          <span>
            <Link href={"https://snupia.kr"} className="text-blue-300">
              동아리 홈페이지
            </Link>
          </span>
        </div>
        <div className="text-gray-400">
          페이지 관리자: 김연준 (kyjun0803@snu.ac.kr)
        </div>
      </div>
    </footer>
  );
}
