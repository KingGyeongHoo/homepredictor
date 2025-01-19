import { useEffect, useState } from "react";
import styled from "styled-components";
import { IResultBodyTemplate } from "../PredictedPrice/PredictedPrice";
import ResultBarBodyTemplate from "../ResultBarBodyTemplate";
import TraficBus from "./TraficBus";
import TraficSubway from "./TraficSubway";

export default function Traffic({
  scrollRef,
  bus,
  subway,
}: {
  bus: { name: string; distance: number }[];
  subway: { name: string; distance: number; line: number }[];
} & IResultBodyTemplate) {
  const [trafficInfo, setTrafficInfo] = useState<any>();

  // eslint-disable-next-line
  useEffect(() => {
    setTrafficInfo({ subway, bus });
  }, []);

  return (
    <ResultBarBodyTemplate title="교통" scrollRef={scrollRef}>
      {trafficInfo && (
        <TrafficContainer>
          <TraficBus busInfo={trafficInfo.bus} />
          <TraficSubway subwayInfo={trafficInfo.subway} />
        </TrafficContainer>
      )}
    </ResultBarBodyTemplate>
  );
}

const TrafficContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;
