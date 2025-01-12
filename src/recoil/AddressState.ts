import { atom } from "recoil";

export const addressState = atom({
  key: "addressState",
  default: {
    address: "",
    apartmentName: "",
    id: 0,
  },
});
