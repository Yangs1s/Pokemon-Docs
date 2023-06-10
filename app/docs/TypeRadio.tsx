/** @format */
"use client";
import React, { useEffect, useState } from "react";

import { Radio } from "../data/radio";
import { useRecoilState } from "recoil";
import filterListState from "../store/filterAtom";
import { RadioType } from "../constants";
import { motion } from "framer-motion";
export default function TypeRadio() {
  const [isSelected, setIsSelected] = useState(false);
  const [radioes, setRadioes] = useState(Radio);
  const [color, setColor] = useState("");
  const [type, setTypes] = useRecoilState(filterListState);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const selectType = e.currentTarget.id as string;
    if (type.includes(selectType)) {
      setTypes(prev => prev.filter(li => li !== selectType));
    } else {
      setTypes(prev => [...prev, selectType]);
    }
  };
  return (
    <div
      className="
    desktop:mt-1 desktop:flex gap-2 desktop:h-[45px] desktop:items-center
    mobile:w-full w-full mobile:m-0 mobile:grid mobile:grid-cols-4 mobile:p-2"
    >
      {radioes?.map((radio: RadioType) => {
        return (
          <button
            key={radio.name}
            id={radio.name}
            onClick={handleClick}
            className="
            desktop:w-auto mobile:w-20 h-8 rounded-md 
            text-sm text-center text-white cursor-pointer 
            px-3 py-1 desktop:m-0 mobile:m-auto"
            style={{
              backgroundColor: `${
                !type.includes(radio.name) ? radio.color : "#eaeaea"
              }`,
            }}
          >
            <span className="text-base font-extrabold">{radio.ko_name}</span>
          </button>
        );
      })}
    </div>
  );
}
