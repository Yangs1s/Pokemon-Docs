/** @format */
"use client";
import React from "react";

type TitleProps = {
  title: string;
};

const ProfileTitle = ({ title }: TitleProps) => {
  return (
    <>
      <h1 className="absolute -top-3 font-extrabold text-xl bg-white">
        {title}
      </h1>
    </>
  );
};

export default ProfileTitle;
