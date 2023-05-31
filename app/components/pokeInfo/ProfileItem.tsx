/** @format */

import React, { ReactNode } from "react";
type ItemsType = {
  children: ReactNode;
};
const ProfileItem = ({ children }: ItemsType) => {
  return <div className="flex flex-col w-1/3 border-r-2 mt-3">{children}</div>;
};

export default ProfileItem;
