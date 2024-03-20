import styled from "styled-components";
import { Map, MapMarker } from "react-kakao-maps-sdk";

export default function ResultMap() {
  return (
    <MapLayout>
      <Map
        center={{ lat: 33.5563, lng: 126.79581 }}
        style={{ width: "100%", height: "100%" }}
      >
        <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
          <div style={{ color: "#000" }}>Hello World!</div>
        </MapMarker>
      </Map>
    </MapLayout>
  );
}

const MapLayout = styled.div`
  height: 100vh;
  width: 80vw;
`;