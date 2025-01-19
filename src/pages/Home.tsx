import styled from "styled-components";

import Header from "../components/Header/Header";
import { SearchBar } from "../components/HomeSection/SearchBar";
import { FirstSection } from "../components/HomeSection/FirstSection";
import { SecondSection } from "../components/HomeSection/SecondSection";
import { ThirdSection } from "../components/HomeSection/ThirdSection";
import TopButton from "../components/HomeSection/TopButton";
interface User {
  type: "user";
  id: string;
  name: string;
}

interface Admin {
  type: "admin";
  id: string;
  name: string;
}
export default function Home() {
  const data = [
    {
      date: "2024.02",
      price: 67100000,
    },
    {
      date: "2024.03",
      price: 67100000,
    },
    {
      date: "2024.04",
      price: 69700000,
    },
    {
      date: "2024.05",
      price: 70200000,
    },
    {
      date: "2024.06",
      price: 65900000,
    },
    {
      date: "2024.07",
      price: 66600000,
    },
    {
      date: "2024.08",
      price: 67100000,
    },
    {
      date: "2024.09",
      price: 67100000,
    },
    {
      date: "2024.10",
      price: 67800000,
    },
    {
      date: "2024.11",
      price: 67400000,
    },
    {
      date: "2024.12",
      price: 67200000,
    },
    {
      date: "2025.01",
      price: 67000000,
    },
  ];

  console.log(data.map((el) => `${el.date} : ${el.price}`).toString());
  return (
    <>
      <TopButton></TopButton>
      <MainContainer>
        <Header></Header>
        <SearchBarDiv>
          <SearchBar></SearchBar>
        </SearchBarDiv>
      </MainContainer>
      <FirstSection></FirstSection>
      <SecondSection></SecondSection>
      <ThirdSection></ThirdSection>
    </>
  );
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background: url("https://images.unsplash.com/photo-1591900888562-85e594570023?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  background-size: cover;
  background-position: center center;
  margin: 0;
`;
const SearchBarDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 95%;
`;
