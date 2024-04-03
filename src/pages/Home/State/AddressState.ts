import { atom } from 'recoil';

export const addressState = atom({
  key: 'addressState',
  default: {
    address:'',
    id:0
  },
});
