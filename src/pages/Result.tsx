import styled from "styled-components";
import Header from "../components/Header/Header";
import ResultMap from "../components/ResultMap/ResultMap";
import ResultBar from "../components/ResultBar/ResultBar";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../apis/api";
import { useParams } from "react-router-dom";
import { infoData } from "../data";
import { useRecoilState } from "recoil";
import { addressState } from "../recoil/AddressState";
import { IInfo } from "../components/ResultBar/ResultBar";

interface IBasicInfo {
  id: number;
  address: string;
  apartmentName: string;
  latitude: number;
  longitude: number;
  bus: { name: string; distance: number }[];
  subway: { name: string; distance: number; line: number };
}

export default function Result() {
  const [clickedAddress, setClickedAddress] = useRecoilState(addressState);
  const [basicInfo, setBasicInfo] = useState<IInfo>();
  const { apartmentId } = useParams();
  console.log(apartmentId);

  useEffect(() => {
    axios
      .get(`https://hp-server.vercel.app/api/info?id=${clickedAddress.id}`)
      .then((res) => {
        setBasicInfo(res.data[0]);
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
          <ResultBar info={basicInfo} />
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
