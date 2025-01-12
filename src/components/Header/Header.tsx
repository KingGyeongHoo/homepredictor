import styled from "styled-components";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { addressState } from "../../recoil/AddressState";

interface CurrentPage {
  curpage: string;
}

export default function Header() {
  const location = useLocation().pathname;
  const navigate = useNavigate();
  const [curPage, setCurPage] = useState("/");
  const setSearch = useSetRecoilState(addressState);
  const onClickLogo = () => {
    setSearch({
      address: "",
      apartmentName: "",
      id: 0,
    });
    navigate("/");
  };

  useEffect(() => {
    setCurPage(location);
  }, [location]);

  return (
    <HeaderLayout curpage={curPage}>
      <div onClick={onClickLogo}>
        <img
          src={`${process.env.PUBLIC_URL}/img/logo_white.png`}
          alt="로고이미지"
        ></img>
        <h2>Home Predictor</h2>
      </div>
    </HeaderLayout>
  );
}

const HeaderLayout = styled.header<CurrentPage>`
  background-color: ${(props) =>
    props.curpage === "/" ? "rgba(0,0,0,0)" : props.theme.colors.primary};
  height: 7vh;
  display: flex;
  align-items: center;
  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;
    margin-left: 1rem;
    cursor: pointer;
    img {
      width: auto;
      height: 60%;
    }
    h2 {
      margin-left: 0.3rem;
      color: white;
      font-weight: 700;
    }
  }
`;
