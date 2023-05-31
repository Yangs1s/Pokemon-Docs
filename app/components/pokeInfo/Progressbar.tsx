/** @format */
"use client";
import { motion } from "framer-motion";
import React, { use, useEffect, useState } from "react";

interface ProgressbarProps {
  percent: number;
  name: string;
}

const Progressbar = ({ name, percent }: ProgressbarProps) => {
  let len = name.length;

  return (
    <div className="flex flex-row items-center">
      <span className={`font-semibold mr-2 w-9`}>
        {len <= 2 ? name : name + " "}
      </span>
      <div className="w-full shadow-md rounded-sm mobile:h-3 desktop:h-5 dark:bg-gray-700 flex flex-row ">
        <motion.div
          className="bg-gray-400 desktop:h-5 rounded-sm mobile:h-3"
          style={{ width: `${percent}%` }}
          initial={{ width: 0 }}
          animate={{
            width: `${percent}%`,
            transition: { duration: 0.7 },
          }}
        ></motion.div>
        <span className="ml-auto text-xs z-10 italic absolute right-4">
          {percent}
        </span>
      </div>
    </div>
  );
};

export default Progressbar;
