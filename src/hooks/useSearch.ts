import { useState } from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { addressState } from "../pages/Home/State/AddressState";

export const useSearch = () => {
  const [address, setAddress] = useState<string>("");
  const [selectedTownData, setSelectedTownData] = useState<any>([]);

  const typeAddress = (e: any) => {
    const apiUrl = "https://api.home-predictor.com/apartments";
    let timer;
    clearTimeout(timer);
    timer = setTimeout(() => {
      axios
        .get(`${apiUrl}?address=${e.target.value}`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
          },
        })
        .then((response) => {
          setSelectedTownData(response.data.slice(0, 20));
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, 500);
    setAddress(e.target.value);
  };

  return { address, selectedTownData, typeAddress, setAddress };
};
