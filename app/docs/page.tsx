/** @format */
"use client";
import TypeRadio from "./TypeRadio";
import List from "./List";
import { BsChevronDoubleRight, BsChevronDoubleLeft } from "react-icons/bs";
import { useRecoilState } from "recoil";
import mobileState from "../store/mobileAtom";
import { motion } from "framer-motion";
import { useState } from "react";

const animate: any = {
  initial: {
    transform: `translateX(50px)`,
    opacity: 0,
    transition: `transform 0.33s ease`,
  },
  animate: {
    transform: `translateX(0px)`,
    opacity: 1,
    transition: `transform 0.33s ease`,
  },
  exit: {
    transform: `translateX(50px)`,
    opacity: 0,
    transition: `transform 0.33s ease`,
  },
};

const toggle: any = {
  closed: {
    transform: `translateX(-50px)`,
    opacity: 0,
    transition: `transform 0.33s ease`,
  },
  open: {
    transform: `translateX(50px)`,
    opacity: 1,
    transition: `transform 0.33s ease`,
  },
};

export default function Docs() {
  const [showType, setMobile] = useRecoilState(mobileState);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div
      initial={animate.initial}
      animate={animate.animate}
      exit={animate.exit}
      className=" w-full max-h-full mt-24"
    >
      <div id="filtering" className="w-full h-full p-3 m-auto desktop:mt-12">
        <div className="flex flex-row items-center">
          <h2 className="text-3xl p-5 font-extrabold">POKEMON</h2>
          <button
            id="toggleBtn"
            className="w-7 h-7 text-center p-2 bg-yellow-300 "
            onClick={() => {
              setMobile(prev => !prev);
              setIsOpen(prev => !prev);
            }}
          >
            {showType ? <BsChevronDoubleRight /> : <BsChevronDoubleLeft />}
          </button>
          {!showType ? (
            <motion.div
              className="m-0 w-auto h-auto bg-white mobile:p-2"
              animate={isOpen ? "open" : "closed"}
            >
              <motion.div
                className="flex desktop:w-[1100px] mobile:h-full"
                variants={toggle}
              >
                <TypeRadio />
              </motion.div>
            </motion.div>
          ) : null}
        </div>
        <List />
      </div>
    </motion.div>
  );
}
