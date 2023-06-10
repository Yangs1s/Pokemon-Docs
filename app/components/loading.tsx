/** @format */

"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { balls } from "../data/loadingBalls";
const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-row w-32 font-extrabold text-4xl my-32">
        <span className="text-[55px]">LOADING</span>
        <div className="flex text-xs mt-auto">
          {balls.map((ball, idx) => {
            return (
              <div key={idx} className="w-5 h-5 animate-spin">
                <Image src={ball} width={30} height={30} alt="ball" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Loading;
