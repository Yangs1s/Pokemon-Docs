/** @format */

/// BadgeType

export type BadgeTypes = {
  [key: string]: {
    name: string;
    ko_name: string;
    color: string;
  };
};
///Result

export interface pokeProps {
  name: string;
  url: string;
}

export interface SearchResult {
  id: number;
  name: string;
  engName: string;
  jpnName: string;
  image: string;
  types: string[];
}

/// Detail
export interface DetailType {
  id: number;
  name: string;
  weight: number;
  height: number;
  image: string;
  koName: string;
  stats: Stats;
  types: Types[];
  skills: Skills[];
}
interface Types {
  type: string;
}
interface Skills {
  skill_name: string;
  skill_kor_name: string;
  skill_desc: string;
}
export interface Stats {
  attack: number;
  hp: number;
  speed: number;
  defence: number;
}

///RadioType

export interface RadioType {
  ko_name: string;
  name: string;
  color: string;
}
