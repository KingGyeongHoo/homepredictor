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

interface IPredictedGraph {
  graphData: IGraphData[];
  graphLength: number;
  size: number;
}
interface IGraphData {
  date: string;
  price: number;
}

export default function PredictedGraph({ graphData, size }: IPredictedGraph) {
  const predictedIndex = graphData.length - 3;
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

  // eslint-disable-next-line
  useEffect(() => {
    setBrushRange([
      graphData.length > 10 ? graphData.length - 10 : 0,
      graphData.length - 1,
    ]);
  }, [graphData]);

  useEffect(() => {
    const tot = brushRange[1] - brushRange[0];
    let percentage = 0;
    if (tot >= 12) {
      percentage = 100 - (1.8 / (tot - 1)) * 100;
    } else if (7 <= tot && tot < 12) {
      percentage = 100 - (1.7 / (tot - 1)) * 100;
    } else if (6 <= tot && tot < 7) {
      percentage = 100 - (1.6 / (tot - 1)) * 100;
    } else if (tot === 5) {
      percentage = 100 - (1.57 / (tot - 1)) * 100;
    } else if (tot === 4) {
      percentage = 100 - (1.5 / (tot - 1)) * 100;
    } else if (tot === 3) {
      percentage = 100 - (1.32 / (tot - 1)) * 100;
    }
    setColorPercent(percentage);
  }, [brushRange]);

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
          <YAxis
            tickFormatter={formatYAxis}
            tick={{ fontSize: 8 }}
            domain={[
              Math.min(...graphData.map((item) => item.price)),
              Math.max(...graphData.map((item) => item.price)),
            ]}
          />
          <Tooltip content={CustomTooltip} />
          <ReferenceLine
            x={graphData[predictedIndex].date}
            stroke="#B9BABA"
            strokeWidth={1.5}
          />
          <Line
            type="stepAfter"
            dataKey="price"
            stroke="url(#gradient)"
            strokeWidth={1.5}
            dot={false}
          />
          {graphData.length > 3 && (
            <Brush
              dataKey="x"
              height={8}
              stroke="#378ce7"
              startIndex={brushRange[0]}
              endIndex={graphData.length - 1}
              onChange={handleBrushChange}
              tickFormatter={formatBrush}
              ariaLabel="Brush"
            />
          )}
        </LineChart>
      </ResponsiveContainer>
      {graphData.length > 3 && (
        <p>
          {graphData[brushRange[0]]?.date} ~ {graphData[brushRange[1]]?.date}
        </p>
      )}
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
        <p className="price">평균: {calPriceUnit(payload[0].value!)}</p>
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
  .price {
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
