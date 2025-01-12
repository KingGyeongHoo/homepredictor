import { useEffect, useState } from "react";
import {
  Map,
  MapMarker,
  MapTypeControl,
  ZoomControl,
} from "react-kakao-maps-sdk";
import styled from "styled-components";

interface IResultMap {
  address: string;
}
export default function ResultMap({ address }: IResultMap) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const geocoder = new kakao.maps.services.Geocoder();
  useEffect(() => {
    geocoder.addressSearch(address, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        setCoords({
          x: Number(result[0].x),
          y: Number(result[0].y),
        });
      }
    });
  }, []);

  return (
    <MapLayout>
      <Map
        center={{ lat: coords.y, lng: coords.x }}
        style={{ width: "100%", height: "100%" }}
      >
        <MapMarker position={{ lat: coords.y, lng: coords.x }} />
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
