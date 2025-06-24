import Link from "next/link";

export default function CatalogFooter() {
  return (
    <footer className="flex px-4 md:px-8 py-8 items-center bg-black">
      <div className="space-y-1 text-sm">
        <div className="">
          본 카탈로그의 악보들은 SNUPia 동아리방(63동 학생회관 428호)에서 열람
          가능합니다! 원하시는 자료가 없다면{" "}
          <span>
            <Link href={"https://imslp.org"} className="text-blue-300">
              IMSLP
            </Link>
          </span>
          를 이용해 보세요.
        </div>
        <div>
          잘못 표기되거나 누락된 정보 제보, 자료 기증 문의 등은 집행진에게 연락
          부탁드립니다!
        </div>
        <div className="text-gray-400">
          서울대학교 중앙 피아노 동아리 SNUPia{" "}
          <span>
            <Link href={"https://snupia.kr"} className="text-blue-300">
              공식 홈페이지
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
