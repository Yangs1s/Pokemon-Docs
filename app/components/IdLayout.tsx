/** @format */

import React from "react";

interface idsLayoutType {
  pokeName: string;
}

const IdLayout = ({ pokeName }: idsLayoutType) => {
  return (
    <div className="flex flex-col items-center ">
      <div className="w-auto text-neutral-500 font-extrabold text-2xl">
        {pokeName}
      </div>
    </div>
  );
};

export default IdLayout;
