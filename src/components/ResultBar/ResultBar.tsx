import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Facilities from "./Facilities/Facilities";
import PredictedPrice from "./PredictedPrice/PredictedPrice";
import RelatedNews from "./RelatedNews/RelatedNews";
import ResultBarHead from "./ResultBarHead";
import ResultBarMenu from "./ResultBarMenu";
import ResultBarSearch from "./ResultBarSearch";
import Traffic from "./Traffic/Traffic";

interface IResultBar {
  apartmentName: string;
  apartmentAdd: string;
}

export default function ResultBar({ apartmentName, apartmentAdd }: IResultBar) {
  const [isOpen, setIsOpen] = useState(false);
  const scrollRef = useRef<HTMLElement[] | null[]>([]);
  const [tabMenuIdx, setTabMenuIdx] = useState(0);

  useEffect(() => {
    var resultBody = document.getElementById("resultBody");
    const changeTabMenuStyle = () => {
      scrollRef.current.forEach((ref, idx) => {
        const targetTop = ref?.offsetTop! - ref?.offsetHeight!;
        const scrollTop = resultBody?.scrollTop!;
        if (targetTop < scrollTop) {
          setTabMenuIdx(idx);
        }
      });
    };
    resultBody!.addEventListener("scroll", changeTabMenuStyle);
    return () => {
      resultBody!.removeEventListener("scroll", changeTabMenuStyle);
    };
  }, [scrollRef]);

  return (
    <ResultBarContainer>
      {isOpen && <ResultBarSearch />}
      <ResultBarHead
        apartmentName={apartmentName}
        apartmentAdd={apartmentAdd}
        setIsOpen={setIsOpen}
      />
      <ResultBarMenu scrollRef={scrollRef} tabMenuIdx={tabMenuIdx} />
      <ResultBodyBox id="resultBody">
        <PredictedPrice
          scrollRef={(ref: any) => (scrollRef.current[0] = ref)}
        />
        <Traffic scrollRef={(ref: any) => (scrollRef.current[1] = ref)} />
        <Facilities scrollRef={(ref: any) => (scrollRef.current[2] = ref)} />
        <RelatedNews scrollRef={(ref: any) => (scrollRef.current[3] = ref)} />
      </ResultBodyBox>
    </ResultBarContainer>
  );
}

const ResultBarContainer = styled.section`
  height: 100%;
  width: 20vw;
  display: flex;
  flex-direction: column;
`;

const ResultBodyBox = styled.div`
  height: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-thumb {
    height: 20%;
    background: ${(props) => props.theme.colors.grayFont};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(33, 122, 244, 0.1);
  }
`;
