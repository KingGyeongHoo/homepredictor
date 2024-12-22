import {
  Map,
  MapMarker,
  MapTypeControl,
  ZoomControl,
} from "react-kakao-maps-sdk";
import styled from "styled-components";

interface IResultMap {
  lat: number;
  lng: number;
}

export default function ResultMap({ lat, lng }: IResultMap) {
  return (
    <MapLayout>
      <Map
        center={{ lat: 33.450701, lng: 126.570667 }}
        style={{ width: "100%", height: "100%" }}
      >
        <MapMarker position={{ lat, lng }} />
        <MapTypeControl />
        <ZoomControl />
      </Map>
    </MapLayout>
  );
}

const MapLayout = styled.div`
  height: 100%;
  width: 80vw;
  position: relative;
`;
