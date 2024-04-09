import { Describe } from "../Describes/Describe";
import { SectionCotainer } from "./FirstSection";

export interface Description {
  main?: string;
  title: string[];
  desc: string[];
  img_src: string;
}

export const ThirdSection = () => {
  const info: Description[] = [
    {
      main: "가격 예측 서비스",
      title: ["3개월 후 집값까지", "똑똑하게 예측"],
      desc: [
        "1-3개월의 후의 부동산 예측 가격을 고객에게 전달하여",
        "현재 매매하고자 하는 부동산의 가격 측정을 하는 데에",
        "도움을 줄 수 있습니다",
      ],
      img_src: "desc1.png",
    },
    {
      main: "키워드 검색",
      title: ["키워드로", "편리한 검색"],
      desc: [
        "정확한 주소를 적지 않아도, 검색어를 입력하면",
        "주변 시설, 상권, 건물 상태 등 다양한 요소를 고려하여",
        "조건에 부합한 건물을 찾아드리는 서비스를 제공합니다.",
      ],
      img_src: "desc2.png",
    },
    {
      main: "실시간 뉴스 반영",
      title: ["실시간 뉴스로", "빠르게 트렌드 캐치"],
      desc: [
        "실시간으로 부동산 정보를 제공하여",
        "급매, 호재, 악재 등의 부동산 속보를",
        "빠르게 전달하고, 합리적 선택을 돕습니다",
      ],
      img_src: "desc3.png",
    },
  ];

  return (
    <SectionCotainer>
      {info.map((el, idx) => (
        <Describe key={idx} info={el} idx={idx}></Describe>
      ))}
    </SectionCotainer>
  );
};
