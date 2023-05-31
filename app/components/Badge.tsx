/** @format */
"use client";
import React, { useEffect, useState } from "react";
import { Space, Tag } from "antd";
import { Badges } from "../data/badges";
import { BadgeTypes } from "../constants";

interface nameType {
  name: string;
}

const Badge = ({ name }: nameType) => {
  const [type, setType] = useState("");
  useEffect(() => {
    setType(name);
  }, [name]);
  const getBadges = (name: keyof BadgeTypes) => {
    return Badges?.find((badge: any) => badge[name] !== undefined)![name];
  };

  return (
    <Space size={[2, 8]} wrap className="mt-1 mobile:m-0">
      {getBadges(name) && (
        <Tag
          className="flex items-center justify-center mobile:w-9 mobile:text-xs desktop:text-md desktop:w-12 p-1"
          color={getBadges(name).color}
        >
          {getBadges(name).ko_name}
        </Tag>
      )}
    </Space>
  );
};

export default Badge;
