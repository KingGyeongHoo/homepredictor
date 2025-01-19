import axios from "axios";
import { useEffect, useState } from "react";
import ResultBarBodyTemplate from "../ResultBarBodyTemplate";
import PredictedGraph from "./PredictedGraph";
import PredictedHead from "./PredictedHead";
import { useRecoilValue } from "recoil";
import { addressState } from "../../../recoil/AddressState";
import PredictedLoading from "./PredictedLoading";

export interface IResultBodyTemplate {
  scrollRef: any;
}

export default function PredictedPrice({ scrollRef }: IResultBodyTemplate) {
  const [size, setSize] = useState<number>(5);
  const [graphData, setGraphData] = useState<any>([]);
  const address = useRecoilValue(addressState);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(
        `https://hp-server.vercel.app/api/predict?id=${address.id}`
      );
      const data = await res.data;
      setGraphData(data.data);
    };
    getData();
  }, []);

  if (!graphData || graphData.length === 0) return <PredictedLoading />;
  return (
    <ResultBarBodyTemplate title="거래예측가(3.3m²당)" scrollRef={scrollRef}>
      <PredictedHead setSize={setSize} />
      {size !== undefined && graphData && (
        <PredictedGraph
          graphData={graphData}
          graphLength={graphData.length}
          size={size}
        />
      )}
    </ResultBarBodyTemplate>
  );
}
