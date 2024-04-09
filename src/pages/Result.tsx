import styled from "styled-components";
import Header from "../components/Header/Header";
import ResultMap from "../components/ResultMap/ResultMap";
import ResultBar from "../components/ResultBar/ResultBar";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../apis/api";
import { useParams } from "react-router-dom";

interface IBasicInfo {
  latitude: number;
  longitude: number;
  apartmentName: string;
  address: string;
}

export default function Result() {
  const [basicInfo, setBasicInfo] = useState<IBasicInfo>();
  const { apartmentId } = useParams();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/v1/apartmenttypes/locations/${apartmentId}`)
      .then((res) => {
        setBasicInfo(res.data);
      })
      .catch((err) => {
        console.log("에러가 발생했습니다" + err);
      });
  }, [apartmentId]);

  return (
    <ResultLayout>
      <Header />
      {basicInfo && (
        <ResultBodyBox>
          <ResultBar
            apartmentName={basicInfo.apartmentName}
            apartmentAdd={basicInfo.address}
          />
          <ResultMap lat={basicInfo.latitude} lng={basicInfo.longitude} />
        </ResultBodyBox>
      )}
    </ResultLayout>
  );
}

const ResultLayout = styled.div``;

const ResultBodyBox = styled.main`
  height: 93vh;
  display: flex;
`;
