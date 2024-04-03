import { useEffect, useState } from "react";
import {
  Brush,
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import styled from "styled-components";
import { calPriceUnit } from "../../../utils/calPriceUnit";
import { temp_graph_data } from "../../../consts/tempData";

interface IPredictedGraph {
  graphData: IGraphData[];
  graphLength: number;
}
interface IGraphData {
  date: string;
  average: number;
}

export default function PredictedGraph({ graphData }: IPredictedGraph) {
  const predictedIndex = graphData.length - 4;
  const [brushRange, setBrushRange] = useState([
    graphData.length > 10 ? graphData.length - 10 : 0,
    graphData.length - 1,
  ]);
  const [colorPercent, setColorPercent] = useState<number>();

  const formatYAxis = (tickItem: number) => {
    return new Intl.NumberFormat("ko-KR", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(tickItem * 10000);
  };

  const formatXAxis = (tickItem: string) => {
    return tickItem.slice(2).replace("-", ".");
  };

  const formatBrush = (tickItem: string) => {
    return "";
  };

  const handleBrushChange = (e: any) => {
    setBrushRange((prev) => [e.startIndex, prev[1]]);
  };

  useEffect(() => {
    const tot = brushRange[1] - brushRange[0];
    const percentage = 100 - (2.6 / (tot - 1)) * 100;
    setColorPercent(percentage);
  }, [brushRange]);

  useEffect(() => {}, [graphData]);

  return (
    <PredictedGraphContainer>
      <ResponsiveContainer width="95%" height={270}>
        <LineChart data={graphData} margin={{ left: -30, top: 20, right: 10 }}>
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="100%" y2="0">
              <stop offset="0%" stopColor="#378ce7" />
              <stop offset={`${colorPercent}%`} stopColor="#378ce7" />
              <stop offset={`${colorPercent}%`} stopColor="red" />
              <stop offset="100%" stopColor="red" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="date"
            tickFormatter={formatXAxis}
            tick={{ fontSize: 10, fill: "#B9BABA" }}
            height={35}
          />
          <YAxis tickFormatter={formatYAxis} tick={{ fontSize: 10 }} />
          <ReferenceLine
            x={graphData[predictedIndex].date}
            stroke="#B9BABA"
            strokeWidth={1.5}
          />
          <Tooltip content={CustomTooltip} />
          <Line
            type="stepAfter"
            dataKey="average"
            stroke="url(#gradient)"
            strokeWidth={1.5}
            dot={false}
          />
          <Brush
            dataKey="x"
            height={8}
            stroke="#378ce7"
            startIndex={brushRange[0]}
            endIndex={graphData.length - 1}
            onChange={handleBrushChange}
            tickFormatter={formatBrush}
          />
        </LineChart>
      </ResponsiveContainer>
      <p>
        {graphData[brushRange[0]].date} ~ {graphData[brushRange[1]].date}
      </p>
    </PredictedGraphContainer>
  );
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const tootipLabel = label.replace("-", "년 ") + "월";

    return (
      <CustomToolTipContainer>
        <p className="label">{tootipLabel}</p>
        <p className="average">평균: {calPriceUnit(payload[0].value!)}</p>
      </CustomToolTipContainer>
    );
  }
};

const CustomToolTipContainer = styled.div`
  background-color: white;
  font-size: 10px;
  padding: 5px 15px;
  border-radius: 10px;
  border: 1px solid rgba(${(props) => props.theme.colors.primaryRGB}, 0.5);
  box-shadow: 0 5px 5px rgba(${(props) => props.theme.colors.primaryRGB}, 0.1);
  display: flex;
  flex-direction: column;
  gap: 3px;
  .average {
    font-weight: 700;
  }
`;

const PredictedGraphContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > p:last-child {
    margin-top: 6px;
    font-size: 13px;
    color: ${(props) => props.theme.colors.primary};
  }

  rect.recharts-brush-slide {
    cursor: default !important;
  }

  g.recharts-layer.recharts-brush-traveller {
    cursor: pointer !important;
  }
`;
