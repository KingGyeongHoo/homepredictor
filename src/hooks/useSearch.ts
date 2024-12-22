import axios from "axios";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { addressState } from "../recoil/AddressState";

export const useSearch = () => {
  const [address, setAddress] = useState<string>("");
  const [selectedTownData, setSelectedTownData] = useState<any>([]);
  const setClickedAddress = useSetRecoilState(addressState);

  const typeAddress = (e: any) => {
    const apiUrl = "https://hp-server.vercel.app/api/address";
    let timer;
    clearTimeout(timer);
    timer = setTimeout(() => {
      axios
        .get(`${apiUrl}?search=${e.target.value}`)
        .then((response) => {
          setSelectedTownData(response.data.slice(0, 20));
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, 500);
    setAddress(e.target.value);
    setClickedAddress({ address: "", id: 0 });
  };

  return { address, selectedTownData, typeAddress, setAddress };
};
