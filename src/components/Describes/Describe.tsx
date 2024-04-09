import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import styled, { css } from "styled-components";

import { Description } from "../HomeSection/FirstSection";
import {
  descLeft,
  descRight,
  fadeInAnimation,
  flexCenter,
} from "../../styles/GlobalStyles";

interface Props {
  info: Description;
  idx: number;
}
export interface Idx {
  idx: number;
  isShow?: boolean;
  isDesc?: boolean;
}
interface IsDesc {
  desc: boolean;
}
export const Describe = ({ info, idx }: Props) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      setIsShow(true);
    }
  }, [inView]);
  return (
    <DescribeCotainer ref={ref} idx={idx} isShow={isShow}>
      <DescDiv idx={idx} isDesc={info.img_src.includes("desc")}>
        {info.main !== undefined && (
          <MainTitle idx={idx}>{info.main}</MainTitle>
        )}
        <h2>
          {info.title.map((el, idx: number) => (
            <span key={idx}>
              {el}
              <br />
            </span>
          ))}
        </h2>
        <div>
          {info.desc.map((el, idx: number) => (
            <p key={idx}>{el}</p>
          ))}
        </div>
      </DescDiv>
      <ImgDiv desc={info.img_src.includes("desc")}>
        <img
          src={`${process.env.PUBLIC_URL}/img/${info.img_src}`}
          alt={info.img_src}
        ></img>
      </ImgDiv>
    </DescribeCotainer>
  );
};

export const DescribeCotainer = styled.div<Idx>`
  display: flex;
  flex-direction: ${(props) => (props.idx % 2 === 0 ? "row" : "row-reverse")};
  justify-content: center;
  width: 80%;
  height: 500px;
  margin: 3% auto;
  @media (max-width: 1280px) {
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10% auto;
  }
  opacity: 0;
  ${(props) =>
    props.isShow &&
    css`
      animation: ${fadeInAnimation} 0.5s ease-in-out forwards;
    `};
`;
const ImgDiv = styled.div<IsDesc>`
  ${flexCenter}
  width: 500px;
  height: 500px;
  @media (max-width: 600px) {
    width: 400px;
    height: 400px;
  }
  img {
    width: ${(props) => (props.desc ? "80%" : "100%")};
    height: ${(props) => (props.desc ? "80%" : "100%")};
    border-radius: ${(props) => props.desc && "50px"};
    box-shadow: ${(props) => props.desc && "0px 4px 5px rgba(0,0,0,0.5)"};
  }
`;
const DescDiv = styled.div<Idx>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 500px;
  height: 500px;
  @media (max-width: 1280px) {
    ${descLeft}
    height: auto;
  }
  @media (max-width: 600px) {
    width: 400px;
  }
  @media (min-width: 1281px) {
    ${(props) =>
      props.isDesc
        ? props.idx % 2 === 0
          ? descRight
          : descLeft
        : props.idx % 2 === 0
        ? descLeft
        : descRight};
  }
`;
const MainTitle = styled.h1<Idx>`
  width: 100%;
  font-size: 2em;
  color: ${(props) => props.theme.colors.primary};
  text-align: ${(props) => (props.idx % 2 === 0 ? "right" : "left")};
  @media (max-width: 1280px) {
    font-size: 1em;
    text-align: left;
  }
`;
