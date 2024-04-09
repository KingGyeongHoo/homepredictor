import styled, { css } from "styled-components";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { fadeInAnimation } from "../../styles/GlobalStyles";
import { Idx } from "../Describes/Describe";
import { SectionCotainer } from "./FirstSection";

export const SecondSection = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      setIsShow(true);
    }
  }, [inView]);

  return (
    <Second ref={ref} idx={0} isShow={isShow}>
      <div>
        <h1>
          <span>HomePredictor</span>는<br />
          부동산의 패를 새롭게 정의합니다
        </h1>
        <div>
          <p>
            3개월 후의 집값 예측 서비스를 이용해 혼란스러운 부동산 시장에서
            나만의 해법을 찾아보세요
          </p>
          <p>
            이 서비스는 여러분이 보다 안정적인 결정을 내리는 데 도움이 될
            것입니다.
          </p>
          <p>
            여러분의 현명한 선택이 미래의 안정적인 생활로 이어질 수 있도록
            돕겠습니다!
          </p>
        </div>
      </div>
    </Second>
  );
};

const Second = styled(SectionCotainer)<Idx>`
  justify-content: center;
  height: 100vh;
  background-color: white;
  opacity: 0;
  ${(props) =>
    props.isShow &&
    css`
      animation: ${fadeInAnimation} 0.5s ease-in-out forwards;
    `};
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50%;
    font-size: 72px;
    @media (max-width: 1280px) {
      font-size: 64px;
    }
    @media (max-width: 1080px) {
      font-size: 48px;
    }
    @media (max-width: 780px) {
      font-size: 36px;
    }
    @media (max-width: 600px) {
      font-size: 30px;
    }
    h1 {
      text-align: center;
      font-size: 1em;
      margin: 1% 0;
      span {
        color: #e78737;
      }
    }
    div {
      display: flex;
      flex-directioan: column;
      align-items: center;
      justify-content: center;
      height: auto;
      margin: 1% 0;
      p {
        text-align: center;
        font-size: 0.3em;
        color: #ababab;
        font-weight: bold;
      }
    }
  }
`;
