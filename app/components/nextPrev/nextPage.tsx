/** @format */

import Link from "next/link";
import React, { memo } from "react";
import { AiOutlineDoubleRight } from "react-icons/ai";

interface NextPage {
  dataId: number;
  nextPokeId: number;
  color: string;
}

const NextPage = ({ dataId, nextPokeId, color }: NextPage) => {
  return (
    <div className="">
      {/* NextPage */}
      <Link
        href={`detail/${nextPokeId}`}
        className={`
        desktop:p-3 desktop:w-auto desktop:pl-6 desktop:h-full desktop:static 
        mobile:w-1/5 mobile:h-30 mobile:p-1 mobile:text-sm mobile:fixed mobile:bottom-0 mobile:right-0
    `}
        prefetch
      >
        <div className="w-auto">
          <AiOutlineDoubleRight className="desktop:w-20 desktop:h-20  mobile:w-10 mobile:h-10" />
        </div>
      </Link>
    </div>
  );
};
export default memo(NextPage);
