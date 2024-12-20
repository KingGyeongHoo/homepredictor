import React from "react";
import styled from "styled-components";
import { flexCenter } from "../../../styles/GlobalStyles";

export interface ITrafficItem {
  name: string;
  distance: number;
  line?: number;
}

export default function TrafficItem({ name, distance, line }: ITrafficItem) {
  const selectSubwayColor = (line: number) => {
    if (line === 1) return "#0d3692";
    else if (line === 2) return "#33a23d";
    else if (line === 3) return "#fe5d10";
    else if (line === 4) return "#00a2d1";
    else if (line === 5) return "#8b50a4";
    else if (line === 6) return "#c55c1d";
    else if (line === 7) return "#6a7215";
    else if (line === 8) return "#e51d6e";
    else if (line === 9) return "#d1a62a";
    else if (line === 10) return "#64aee2";
    else if (line === 11) return "#75c2a0";
    else if (line === 12) return "#a61e31";
    else if (line === 13) return "#eaa400";
    else if (line === 21) return "#6f99d0";
    else if (line === 22) return "#f4ab3e";
    else if (line === 31) return "#f0602f";
    else if (line === 32) return "#3db449";
    else if (line === 41) return "#3db54a";
    return "";
  };

  const lineName = (line: number) => {
    if (line < 10) return `${line}호선`;
    else if (line === 10) return "공항철도";
    else if (line === 11) return "경의중앙선";
    else if (line === 12) return "신분당선";
    else if (line === 13) return "수인분당선";
    else if (line === 21) return "인천1호선";
    else if (line === 22) return "인천2호선";
    else if (line === 31) return "부산1호선";
    else if (line === 32) return "부산2호선";
    else if (line === 41) return "대전1호선";
    return "";
  };

  return (
    <TrafficItemContainer>
      {line && (
        <SubwayLineBox lineColor={selectSubwayColor(line)}>
          {lineName(line)}
        </SubwayLineBox>
      )}
      <h6>{name}</h6>
      <p>{distance * 100}m</p>
    </TrafficItemContainer>
  );
}

const TrafficItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  & > h6 {
    font-size: 11px;
    font-weight: 500;
  }
  & > p:last-child {
    font-size: 9px;
    color: ${(props) => props.theme.colors.grayFont};
  }
`;

const SubwayLineBox = styled.span<{ lineColor: string }>`
  ${flexCenter}
  font-size: 9px;
  padding: 1px 5px;
  border-radius: 10px;
  color: white;
  background-color: ${(props) => props.lineColor};
`;
