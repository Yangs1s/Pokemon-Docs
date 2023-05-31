/** @format */

import React from "react";
import Badge from "@/app/components/Badge";

interface BadgeType {
  data: dataType[];
}
interface dataType {
  type: string;
}
const badges = (data: BadgeType) => {
  return (
    <div className="mx-auto">
      {data.data.map(type => (
        <Badge name={type.type} key={type.type} />
      ))}
    </div>
  );
};

export default badges;
