import axios from "axios";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { addressState } from "../recoil/AddressState";

export const useSearch = () => {
  const [address, setAddress] = useState<string>("");
  const [selectedTownData, setSelectedTownData] = useState<any>([]);
  const setClickedAddress = useSetRecoilState(addressState);

  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const typeAddress = (e: any) => {
    const apiUrl = "https://hp-server.vercel.app/api/address";

    if (timer) {
      clearTimeout(timer);
    }

    const newTimer = setTimeout(() => {
      axios
        .get(`${apiUrl}?search=${e.target.value}`)
        .then((response) => {
          setSelectedTownData(response.data.slice(0, 20));
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, 500);

    setTimer(newTimer);

    setAddress(e.target.value);
    setClickedAddress({ address: "", apartmentName: "", id: 0 });
  };

  return { address, selectedTownData, typeAddress, setAddress };
};
