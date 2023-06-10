/** @format */
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const variants = {
  open: { scale: 5.9 },
  closed: { scale: 0.6 },
};

const Entrance: React.FC = () => {
  const [isSpin, setIsSpin] = useState(false);
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const handleSpin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setIsSpin(true);
    setTimeout(() => {
      setIsSpin(false);
      router.push("/docs");
    }, 100);
  };

  return (
    <div className="flex flex-col items-center h-full justify-center w-full m-auto gap-4">
      <Image
        alt="logo"
        src={"/pokemon.png"}
        width={250}
        height={100}
        className=""
      />

      <button onClick={handleSpin} type="button">
        <AnimatePresence>
          <motion.div
            animate={isOpen ? "open" : "closed"}
            variants={variants}
            className="bg-white rounded-full w-36 h-36"
            onClick={() => setIsOpen(prev => !prev)}
          >
            <Image
              src={
                "https://raw.githubusercontent.com/ahampriyanshu/gokemon/master/assets/img/pokeball.png"
              }
              width={150}
              height={150}
              alt="pokemon ball"
              className="shadow-2xl rounded-full bg-white"
            />
          </motion.div>
        </AnimatePresence>
      </button>
    </div>
  );
};

export default Entrance;
