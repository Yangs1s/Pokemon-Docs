/** @format */

import { atom } from "recoil";
const mobileState = atom({
  key: "showSelectType", // unique ID (with respect to other atoms/selectors)
  default: true, // default value (aka initial value)
});

export default mobileState;
