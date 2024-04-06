/* eslint-disable */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { BASE_URL } from "../../../apis/api";
import MaxMinPrice from "./MaxMinPrice";

export interface IPrice {
  date: number;
  price: number;
}

interface ISizeData {
  apartmentTypeId: number;
  highestPredictedPrice: IPrice;
  lowestPredictedPrice: IPrice;
  predictedPrice1: number;
  predictedPrice2: number;
  predictedPrice3: number;
  size: number;
}

interface IPredictedHead {
  setSize: any;
}

function PredictedHead({ setSize }: IPredictedHead) {
  const [maxPredicted, setMaxPredicted] = useState<IPrice>();
  const [minPredicted, setMinPredicted] = useState<IPrice>();
  const [activeBtn, setActiveBtn] = useState<number>();
  const [sizeData, setSizeData] = useState<ISizeData[]>();
  const { apartmentId } = useParams();

  const onClickSquare = (
    max: IPrice,
    min: IPrice,
    size: number,
    idx: number
  ) => {
    setMaxPredicted(max);
    setMinPredicted(min);
    setSize(size);
    setActiveBtn(idx);
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/v1/apartmenttypes/${apartmentId}`)
      .then((res) => {
        setSizeData(res.data);
        onClickSquare(
          res.data[0].highestPredictedPrice,
          res.data[0].lowestPredictedPrice,
          res.data[0].apartmentTypeId,
          0
        );
      })
      .catch((err) => {
        console.log("에러가 발생했습니다" + err);
      });
  }, [apartmentId]);

  return (
    <>
      <SizeButtonBox>
        {sizeData &&
          sizeData!.map((item: any, idx: number) => (
            <SizeButton
              onClick={() =>
                onClickSquare(
                  item.highestPredictedPrice,
                  item.lowestPredictedPrice,
                  item.apartmentTypeId,
                  idx
                )
              }
              isActive={activeBtn === idx}
            >
              {item.size}평
            </SizeButton>
          ))}
      </SizeButtonBox>
      {maxPredicted && minPredicted && (
        <MaxMinPrice maxPredicted={maxPredicted} minPredicted={minPredicted} />
      )}
    </>
  );
}

export default PredictedHead;

const SizeButtonBox = styled.div`
  padding: 0 3px;
  margin-bottom: 20px;
  display: grid;
  column-gap: 12px;
  row-gap: 9px;
  grid-template-columns: repeat(auto-fill, minmax(30px, 1fr));
`;

const SizeButton = styled.button<{ isActive: boolean }>`
  padding: 3px 3px;
  font-size: 10px;
  border: 1px solid rgba(${(props) => props.theme.colors.primaryRGB}, 0.4);
  border-radius: 8px;
  background-color: ${(props) =>
    props.isActive ? `rgba(${props.theme.colors.primaryRGB},0.4)` : "white"};

  font-weight: ${(props) => (props.isActive ? "600" : "500")};
  color: ${(props) => (props.isActive ? "white" : "black")};
  cursor: pointer;
`;
