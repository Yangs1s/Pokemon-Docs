/** @format */

"use client";
import React, { useState } from "react";
import Progressbar from "../components/pokeInfo/Progressbar";
import Divider from "./divider";
import Badges from "./badges";
import { DetailType } from "../constants";
import ProfileTitle from "@/app/components/pokeInfo/ProfileTitle";
import ProfileItem from "../components/pokeInfo/ProfileItem";
import Modal from "./modal";

interface InfoTypes {
  data: DetailType;
  mobile: boolean;
}

const PokeInfo = ({ data, mobile }: InfoTypes) => {
  const [isTab, setIsTab] = useState<number>(0);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState<string>("");

  return (
    <div className="desktop:flex flex-col mobile:block gap-2 mobile:gap-1 w-full">
      <span className="desktop:text-3xl font-bold mobile:text-xl mobile:mr-2">
        {data.koName}
      </span>
      <span className="text-gray-400 desktop:text-lg font-semibold mobile:text-sm">
        &nbsp;
      </span>
      {mobile === true ? (
        <div className="w-full h-1/6 px-2 mobile:px-0 py-1 ">
          <div className="flex mt-1 flex-row mb-7">
            <button
              className="cursor-pointer bg-black border-white border-r-[1px] text-white p-1 text-xs"
              onClick={() => {
                setIsTab(0);
              }}
            >
              스탯
            </button>
            <button
              className="cursor-pointer bg-black text-white p-1 text-xs border-r-[1px]"
              onClick={() => {
                setIsTab(1);
              }}
            >
              프로필
            </button>
            <button
              className="bg-black text-white p-1 text-xs"
              onClick={() => {
                setIsTab(2);
              }}
            >
              스킬
            </button>
          </div>
          <div
            className={`${
              mobile ? "mt-42" : ""
            }border-4 border-gray-800 w-full h-auto rounded-lg flex gap-2 flex-col`}
            id="poke-info"
          >
            {isTab == 0 ? (
              <div className="flex relative px-2 py-3 flex-col rounded-xl border-[1px] border-black">
                <ProfileTitle title={"STATS"} />
                <Progressbar name={"ATT"} percent={data.stats.attack} />
                <Progressbar name={"DEF"} percent={data.stats.defence} />
                <Progressbar name={"HP"} percent={data.stats.hp} />
                <Progressbar name={"SPD"} percent={data.stats.speed} />
              </div>
            ) : isTab === 1 ? (
              <div className="border-2 relative border-black w-full flex flex-row h-28 mobile:h-32 rounded-lg p-2 text-lg text-center mobile:mb-1">
                <ProfileTitle title={"PROFILE"} />
                <ProfileItem>
                  <h4 className="font-extrabold">몸무게</h4>
                  <span className="text-mobile">
                    {data.weight} <strong>kg</strong>
                  </span>
                </ProfileItem>
                <ProfileItem>
                  <h4 className="font-extrabold">키</h4>
                  <span className="text-mobile">
                    {data.height} <strong>m</strong>
                  </span>
                </ProfileItem>
                <ProfileItem>
                  <h4 className="font-extrabold">타입</h4>
                  <div className="flex flex-row justify-center items-center">
                    <Badges data={data.types} />
                  </div>
                </ProfileItem>
              </div>
            ) : (
              <div className="border-2 relative border-black w-full flex flex-row h-28 mobile:h-32 rounded-lg p-2 text-lg text-center mobile:mb-1">
                <ProfileTitle title={"SKILLS"} />
                <div className=" flex flex-row w-full justify-around mt-3">
                  {data.skills.map((skill, idx: number) => (
                    <div key={skill.skill_name} className="">
                      <div className="border-b-2">
                        <h3 className="text-base font-extrabold">{`SKILL${
                          idx + 1
                        }`}</h3>
                      </div>
                      <div
                        id={skill.skill_name}
                        onClick={e => {
                          setCurrentValue(e.currentTarget.id);
                          setIsModal(prev => !prev);
                        }}
                      >
                        {skill.skill_kor_name}
                      </div>

                      {isModal
                        ? skill.skill_name === currentValue && (
                            <Modal
                              description={skill.skill_desc}
                              id={skill.skill_name}
                              setModal={setIsModal}
                            />
                          )
                        : null}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div
          className={`border-4 border-gray-800 w-full p-3 h-full rounded-lg flex gap-2 flex-col`}
          id="poke-info"
        >
          <div className="flex relative p-3 py-6 flex-col rounded-xl border-[1px] border-black">
            <ProfileTitle title="STATS" />
            <Progressbar name={"ATT"} percent={data.stats.attack} />
            <Progressbar name={"DEF"} percent={data.stats.defence} />
            <Progressbar name={"HP"} percent={data.stats.hp} />
            <Progressbar name={"SPD"} percent={data.stats.speed} />
          </div>
          <div className="border-2 relative border-black w-full flex flex-row h-28 mobile:h-32 rounded-lg p-2 text-lg text-center mobile:mb-1 desktop:mt-3">
            <ProfileTitle title={"SKILLS"} />
            <div className=" flex flex-row w-full justify-around mt-3">
              {data.skills.map((skill, idx: number) => (
                <div key={skill.skill_name} className="">
                  <div className="border-b-2">
                    <h3 className="text-base font-extrabold">{`SKILL${
                      idx + 1
                    }`}</h3>
                  </div>
                  <div
                    id={skill.skill_name}
                    onClick={e => {
                      setCurrentValue(e.currentTarget.id);
                      setIsModal(prev => !prev);
                    }}
                  >
                    {skill.skill_kor_name}
                  </div>

                  {isModal
                    ? skill.skill_name === currentValue && (
                        <Modal
                          description={skill.skill_desc}
                          id={skill.skill_name}
                          setModal={setIsModal}
                        />
                      )
                    : null}
                </div>
              ))}
            </div>
          </div>
          <div className="border-2 border-black w-full flex flex-row h-28 mobile:h-20 rounded-lg p-2 text-lg text-center mobile:mt-6">
            <div className="flex flex-col w-1/3 ">
              <h4 className="font-extrabold ">몸무게</h4>
              <span className="text-mobile">{data.weight} kg</span>
            </div>
            <Divider />
            <div className="flex flex-col w-1/3">
              <h4 className="font-extrabold">키</h4>
              <span className="text-mobile">{data.height} m</span>
            </div>
            <Divider />
            <div className="flex flex-col w-1/3 ">
              <h4 className="font-extrabold">타입</h4>
              <Badges data={data.types} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokeInfo;
