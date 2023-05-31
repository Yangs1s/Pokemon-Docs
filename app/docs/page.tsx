/** @format */
"use client";
import TypeRadio from "./TypeRadio";
import List from "./List";
import {
  HiOutlineChevronDoubleDown,
  HiOutlineChevronDoubleUp,
} from "react-icons/hi";
import { useRecoilState } from "recoil";
import mobileState from "../store/mobileAtom";
import { motion } from "framer-motion";

const animate: any = {
  initial: {
    transform: `translateY(50px)`,
    opacity: 0,
    transition: `transform 0.33s ease`,
  },
  animate: {
    transform: `translateY(0px)`,
    opacity: 1,
    transition: `transform 0.33s ease`,
  },
  exit: {
    transform: `translateY(50px)`,
    opacity: 0,
    transition: `transform 0.33s ease`,
  },
};

export default function Docs() {
  const [showType, setMobile] = useRecoilState(mobileState);
  return (
    <motion.div
      initial={animate.initial}
      animate={animate.animate}
      exit={animate.exit}
      className=" w-full max-w-full"
    >
      <div
        className="
          desktop:mt-2 desktop:py-3 desktop:px-12 
          mobile:py-30 mobile:mt-32 
          mb-2 mobile:sticky desktop:relative tablet:relative desktop:top-30"
      >
        <button
          className="fixed p-2 bg-yellow-300 desktop:top-[50px] mobile:top-24 right-5 z-10"
          onClick={() => {
            setMobile(prev => !prev);
          }}
        >
          {showType ? (
            <HiOutlineChevronDoubleUp />
          ) : (
            <HiOutlineChevronDoubleDown />
          )}
        </button>

        {!showType ? (
          <motion.div
            className="fixed w-full desktop:top-[92px] mobile:top-32  left-0 bg-white mobile:p-2"
            initial={{ y: -100 }}
            animate={{ y: 0, transition: { duration: 0.3 } }}
          >
            <div className="max-w-full mobile:h-full desktop:h-auto">
              <h1
                className={`ml-2 text-3xl font-extrabold italic ${
                  showType ? "hidden" : "block"
                }`}
              >
                속성 선택
              </h1>
              <TypeRadio />
            </div>
          </motion.div>
        ) : null}
      </div>
      <div className="w-auto h-full p-3 m-auto desktop:mt-12">
        <List />
      </div>
    </motion.div>
  );
}
