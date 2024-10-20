import { atom } from "recoil";

const editTaskAtom = atom({
  key: "editTaskAtom",
  default: null,
});

export default editTaskAtom;