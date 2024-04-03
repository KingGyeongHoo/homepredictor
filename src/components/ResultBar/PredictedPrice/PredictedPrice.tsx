import { useState, useEffect } from "react";
import ResultBarBodyTemplate from "../ResultBarBodyTemplate";
import PredictedGraph from "./PredictedGraph";
import PredictedHead from "./PredictedHead";
import axios from "axios";
import { BASE_URL } from "../../../apis/api";
import { temp_graph_data } from "../../../consts/tempData";

export interface IResultBodyTemplate {
  scrollRef: any;
}

export default function PredictedPrice({ scrollRef }: IResultBodyTemplate) {
  // eslint-disable-next-line
  const [size, setSize] = useState<number>();
  const [graphData, setGraphData] = useState<any>();

  useEffect(() => {
    if (size != undefined) {
      console.log("아");
      setGraphData(temp_graph_data);
      console.log(temp_graph_data.length);
      // axios
      //   .get(`${BASE_URL}/v1/dealhistories/${size}`)
      //   .then((res) => {
      //     const data = res.data.dealHistoryAverageDtoList;
      //     console.log(temp_graph_data);
      //     setGraphData(data);
      //   })
      //   .catch((err) => {
      //     console.log("에러가 발생했습니다" + err);
      //   });
    }
  }, [size]);

  return (
    <ResultBarBodyTemplate title="거래예측가" scrollRef={scrollRef}>
      <PredictedHead setSize={setSize} />
      {size != undefined && graphData && (
        <PredictedGraph graphData={graphData} graphLength={graphData.length} />
      )}
    </ResultBarBodyTemplate>
  );
}
