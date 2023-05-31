/** @format */

import { atom } from "recoil";

const textState = atom<string>({
  key: "textState", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});

export default textState;
