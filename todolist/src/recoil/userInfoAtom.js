import { atom } from "recoil";

const userInfoAtom = atom({
  key: "userInfoAtom",
  // default: localStorage.getItem("userStatus") === 'true', // Ensure this reads as boolean
  default:false,
});

export default userInfoAtom;