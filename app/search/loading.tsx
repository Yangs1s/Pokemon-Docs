/** @format */

"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
const Loading: React.FC = () => {
  const [isSpin, setIsSpin] = useState(false);
  const router = useRouter();
  console.log(isSpin);

  useEffect(() => {
    setIsSpin(true);
  }, []);

  return (
    <div className="flex flex-col items-center h-full justify-center w-full m-auto">
      <div className="rounded-full shadow-lg w-32 h-32 cursor-pointer ...">
        <div
          className={` rounded-full flex flex-col w-32 h-32 bg-white  ${
            isSpin ? "animate-spin-slow" : "animate-none"
          }`}
        >
          <Image
            src={
              "https://raw.githubusercontent.com/ahampriyanshu/gokemon/master/assets/img/pokeball.png"
            }
            width={300}
            height={300}
            alt="pokemon ball"
          />
        </div>
      </div>
    </div>
  );
};

export default Loading;
