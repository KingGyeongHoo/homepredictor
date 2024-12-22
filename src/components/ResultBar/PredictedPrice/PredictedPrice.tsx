import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../apis/api";
import ResultBarBodyTemplate from "../ResultBarBodyTemplate";
import PredictedGraph from "./PredictedGraph";
import PredictedHead from "./PredictedHead";
import { temp_graph_data } from "../../../consts/tempData";

export interface IResultBodyTemplate {
  scrollRef: any;
}

export default function PredictedPrice({ scrollRef }: IResultBodyTemplate) {
  const [size, setSize] = useState<number>(5);
  const [graphData, setGraphData] = useState<any>(temp_graph_data);

  return (
    <ResultBarBodyTemplate title="거래예측가" scrollRef={scrollRef}>
      <PredictedHead setSize={setSize} />
      {size !== undefined && graphData && (
        <PredictedGraph
          graphData={temp_graph_data}
          graphLength={temp_graph_data.length}
          size={size}
        />
      )}
    </ResultBarBodyTemplate>
  );
}
