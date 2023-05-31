/** @format */

import { atom, selector } from "recoil";

const filterListState = atom<string[]>({
  key: "filterList", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export default filterListState;
