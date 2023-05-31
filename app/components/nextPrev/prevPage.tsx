/** @format */

import Link from "next/link";
import React from "react";
import { AiOutlineDoubleLeft } from "react-icons/ai";

interface prevPage {
  pokeId: number;
  dataId: number;
  color: string;
}

const prevPage = ({ dataId, pokeId, color }: prevPage) => {
  return (
    <div className="">
      {dataId == 1 ? (
        <Link
          href={"/docs"}
          className="
          desktop:p-3 desktop:w-1/2 desktop:pl-6 desktop:h-full 
          mobile:w-1/6 mobile:h-30 mobile:p-1 mobile:text-sm mobile:fixed mobile:bottom-0 mobile:left-0
          "
        >
          &nbsp;
        </Link>
      ) : (
        // prevPage
        <Link
          href={`detail/${pokeId}`}
          className={`
            desktop:p-3 desktop:w-auto desktop:pl-6 desktop:h-full desktop:static 
            mobile:w-1/5 mobile:h-30 mobile:p-1 mobile:text-sm mobile:fixed mobile:bottom-0 mobile:left-0
          
          `}
        >
          <div className="w-auto">
            <AiOutlineDoubleLeft className="desktop:w-20 desktop:h-20 mobile:w-10 mobile:h-10" />
          </div>
        </Link>
      )}
    </div>
  );
};
export default prevPage;
