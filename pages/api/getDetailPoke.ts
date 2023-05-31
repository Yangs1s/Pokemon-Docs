/** @format */
import axios from "axios";
interface StatData {
  base: number;
}

interface Type {
  type: string;
}

interface AbilityType {
  skill_name: string;
  skill_kor_name: string;
  skill_desc: string;
}

interface PokemonData {
  id: number;
  name: string;
  color: string;
  weight: number;
  height: number;
  image: string;
  koName: string;
  stats: {
    attack: number;
    hp: number;
    speed: number;
    defence: number;
  };
  skills: AbilityType[];
  types: Type[];
}
interface statType {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}
interface TypeData {
  slot: number;
  type: { name: string };
}
interface skillTypes {
  ability: { name: string; url: string };
  is_hidden: boolean;
  slot: number;
}

export default async function fetchData(name: string): Promise<PokemonData> {
  const [result, speciesResponse] = await Promise.all([
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`),
    axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}/`),
  ]);
  const data = result.data;
  const nameData = speciesResponse.data;

  const statData: StatData[] = await Promise.all(
    data.stats.map((stat: statType) => {
      return {
        base: stat.base_stat,
      };
    })
  );

  const typeData = await Promise.all(
    data.types.map((type: TypeData) => {
      return {
        type: type.type.name,
      };
    })
  );

  const skillData = await Promise.all(
    data.abilities.map(async (ability: skillTypes) => {
      const urls = ability.ability.url;
      const korSkill = await axios.get(urls).then(skill => skill.data);

      const descriptionKor = korSkill.flavor_text_entries.filter(
        (skill: any) => skill.language.name === "ko"
      );
      return {
        skill_name: ability.ability.name,
        skill_kor_name: korSkill.names[1].name,
        skill_desc: descriptionKor[0].flavor_text,
      };
    })
  );
  return {
    id: data.id,
    color: nameData.color.name,
    name: data.name,
    weight: data.weight,
    height: data.height,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
    koName: nameData.names[2].name,
    stats: {
      attack: statData[1].base,
      hp: statData[0].base,
      speed: statData[5].base,
      defence: statData[2].base,
    },
    skills: skillData,
    types: typeData,
  };
}
