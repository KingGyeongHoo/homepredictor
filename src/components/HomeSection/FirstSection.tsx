import styled from "styled-components";

import { Describe } from "../Describes/Describe";

export interface Description {
  main?: string;
  title: string[];
  desc: string[];
  img_src: string;
}

export const FirstSection = () => {
  const info: Description[] = [
    {
      title: ["혼란한 부동산 시장.", "어떻게 대응해야 할까?"],
      desc: [
        "부동산 시장의 불확실성으로 많은 사람들이 혼란스러워하고 있습니다",
        "가격의 예측이 어려워지고 변동성이 높아지면서",
        "투자 결정에 대한 고민은 늘어만 가고 있습니다",
        "이러한 상황에서 정확한 정보와 안정적인 전망은 필수적입니다",
      ],
      img_src: "graph.png",
    },
    {
      title: ["부동산 시장의 혼란 속", "예측 서비스의 중요성"],
      desc: [
        "현 부동산 시장은 다양한 변수에 의해 불안정한 상태입니다",
        "이에 대한 정확한 분석과 미래의 집값 예측 서비스는",
        "시장을 안정화시키는 데 중요한 역할을 할 수 있습니다",
      ],
      img_src: "predict.png",
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

export const SectionCotainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: auto;
  background-color: #fcfcfc;
  font-weight: bold;
`;
