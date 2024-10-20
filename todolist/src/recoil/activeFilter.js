import { atom } from "recoil";

const activeFilter = atom({
  key: "activeFilter",
  default: "All",
});

export default activeFilter;