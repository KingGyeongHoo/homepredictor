import styled, { keyframes } from "styled-components";

export default function PredictedLoading() {
  return (
    <LoadingComponent>
      <Loader></Loader>데이터를 로딩중입니다.
    </LoadingComponent>
  );
}

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`;

const LoadingComponent = styled.div`
  width: 100%;
  height: fit-content;
  padding: 10%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;

const Loader = styled.div`
  margin: 5% auto;
  height: 50px;
  width: 50px;
  border: 3px solid #ffffff;
  border-top-color: ${(props) => props.theme.colors.primary};
  border-right-color: ${(props) => props.theme.colors.primary};
  border-radius: 100%;
  animation: ${spin} 1000ms infinite linear;
`;
