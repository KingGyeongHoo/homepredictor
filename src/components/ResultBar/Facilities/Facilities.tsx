import styled from "styled-components";
import ResultBarBodyTemplate from "../ResultBarBodyTemplate";
import { IResultBodyTemplate } from "../PredictedPrice/PredictedPrice";

export default function Facilities({
  scrollRef,
  facilities,
}: {
  facilities: { name: string; distance: number; type: string }[];
} & IResultBodyTemplate) {
  const getColor = (type: string) => {
    if (type === "공원") return "#067822";
    else if (type === "마트") return "#d39d13";
    else if (type === "병원") return "#e10505";
    else if (type === "쇼핑") return "#7c0960";
    else if (type === "전시/컨벤션") return "#2b099e";
    else if (type === "종교시설") return "#562c04";
    else if (type === "문화") return "#ba0249";
    else if (type === "행정기관") return "#3a3a3a";
    else if (type === "교통") return "#074a92";
    else if (type === "업무/상업시설") return "#000000";
    return "";
  };
  return (
    <ResultBarBodyTemplate title="주변시설" scrollRef={scrollRef}>
      <FacilitiesContainer>
        {facilities.map((el) => {
          return (
            <FacilitiesItem>
              <FacilityLineBox lineColor={getColor(el.type)}>
                {el.type}
              </FacilityLineBox>
              <span>{el.name}</span>
            </FacilitiesItem>
          );
        })}
      </FacilitiesContainer>
    </ResultBarBodyTemplate>
  );
}

const FacilitiesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const FacilitiesItem = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  & > span {
    font-size: 11px;
    font-weight: 500;
  }
`;

const FacilityLineBox = styled.span<{ lineColor: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 5px;
  padding: 1px 5px;
  border-radius: 10px;
  color: white;
  background-color: ${(props) => props.lineColor};
`;
