import { useEffect, useState } from "react";
import styled from "styled-components";
import { temp_traffic_data } from "../../../consts/tempData";
import { IResultBodyTemplate } from "../PredictedPrice/PredictedPrice";
import ResultBarBodyTemplate from "../ResultBarBodyTemplate";
import TraficBus from "./TraficBus";
import TraficSubway from "./TraficSubway";

export default function Traffic({ scrollRef }: IResultBodyTemplate) {
  const [trafficInfo, setTrafficInfo] = useState<any>();

  // eslint-disable-next-line
  useEffect(() => {
    setTrafficInfo(temp_traffic_data);
  });

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
