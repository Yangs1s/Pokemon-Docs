/** @format */
"use client";
import Image from "next/image";
import { useQuery } from "react-query";
import getDetailPoke from "@/pages/api/getDetailPoke";
import PokeInfo from "../pokeInfo";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PrevPage from "@/app/components/nextPrev/prevPage";
import tinycolor from "tinycolor2";
import NextPage from "../../components/nextPrev/nextPage";
type paramType = {
  params: {
    id: string;
  };
};
const MOBILE_SIZE = 320;
const DESKTOP_SIZE = 1250;

const converToColorNameToHex = (colorName: string) => {
  const color = tinycolor(colorName);

  return color.toHexString();
};

const Detail = ({ params }: paramType) => {
  const { id } = params;
  const [isMobile, setIsMobile] = useState(false);
  const [pageWidth, setPageWidth] = useState<number>(window.innerWidth);
  const handleResize = () => {
    setPageWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [pageWidth]);

  useEffect(() => {
    pageWidth >= MOBILE_SIZE && pageWidth < DESKTOP_SIZE
      ? setIsMobile(true)
      : setIsMobile(false);
  }, [pageWidth]);

  const { data, isLoading } = useQuery("pokemon", () => getDetailPoke(id));
  if (!data) return null;
  if (isLoading) return <div>Loding중</div>;
  const prevId = data.id - 1;
  const nextId = data.id + 1;

  const hexCodeColor = converToColorNameToHex(data?.color);
  return (
    <div className="w-screen h-screen flex justify-center items-center p-32 mobile:p-0">
      <div className="ml-auto flex w-auto desktop:static mobile:fixed mobile:w-20 mobile:h-20 mobile:left-0 mobile:bottom-0 desktop:rounded-xl">
        <PrevPage dataId={data.id} pokeId={prevId} color={hexCodeColor} />
      </div>
      <div
        className="
          desktop:w-full desktop:flex desktop:items-center desktop:flex-col 
          desktop:justify-center desktop:relative desktop:top-0 desktop:mt-2
          mobile:w-4/5 mobile:h-auto mobile:block desktop:rounded-xl"
      >
        <motion.div
          className="
          desktop:relative desktop:border-0 desktop:rounded-xl
          desktop:w-[500px] desktop:h-1/5 desktop:mt-9
          flex rounded-tl-2xl gap-3 flex-col 
          mobile:h-full mobile:w-[90%] mobile:border-2
          "
          initial={{ x: 0, opacity: 0 }}
          animate={{
            x: 25,
            opacity: 1,
            transition: {
              duration: 0.6,
            },
          }}
        >
          <figure
            className={`
            desktop:w-full absolute desktop:top-20 desktop:right-0 
            flex justify-center desktop:h-auto desktop:rounded-t-3xl
            mobile:relative mobile:bg-white 
            rounded-tl-2xl
          `}
            style={{
              backgroundColor: `#eaeaea`,
            }}
          >
            <div
              className="desktop:rounded-b-full desktop:w-full absolute 
              desktop:left-30 top-0 desktop:h-48 mobile:w-32 h-32 
              mobile:rounded-br-full mobile:left-0"
              style={{
                background: ` ${
                  hexCodeColor === "#ffffff" ? "#000000" : hexCodeColor + "89"
                }`,
              }}
            >
              &nbsp;
            </div>
            <span
              className="
              desktop:absolute desktop:bottom-28 desktop:top-36 desktop:left-2 
              mobile:text-black mobile:absolute mobile:left-0 mobile:top-0
              font-extrabold text-2xl mobile:z-0 z-20 h-auto mt-2"
            >
              {data.id < 10
                ? "NO.00" + data.id
                : data.id < 100
                ? "NO.0" + data.id
                : "NO." + data.id}
            </span>
            <Image
              src={data.image}
              alt="포켓몬 사진"
              width={400}
              height={300}
              className="mobile:w-48 mobile:h-56 mobile:ml-16 desktop:w-72 desktop:h-64 desktop:ml-auto z-20 "
            />
          </figure>
          <div className="border-2 bg-slate-100 p-3 desktop:w-full mt-10 desktop:m-auto mobile:m-0 z-10 desktop:rounded-xl">
            <PokeInfo data={data} mobile={isMobile} />
          </div>
        </motion.div>
      </div>
      <div className="w-auto desktop:static mobile:w-20 mobile:h-20 mobile:fixed mobile:bottom-0 mobile:right-0">
        <NextPage dataId={data.id} nextPokeId={nextId} color={hexCodeColor} />
      </div>
    </div>
  );
};

export default Detail;
