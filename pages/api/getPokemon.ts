/** @format */

import axios from "axios";

export default async function fetchData(pageParam: string) {
  const result = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=40&offset=${pageParam}`
  ).then(response => response.json());

  const res = result;

  console.log(result);
  const pokemons = await Promise.all(
    res.results.map(async (poke: any) => {
      const result = await axios.get(poke.url);
      const data = result.data;

      console.log(data);
      const types = data.types.map((li: any) => li.type.name);

      const koNameUrl = data.species.url;
      const resultkoName = await axios.get(koNameUrl);

      const nameData = resultkoName.data;
      const koName = nameData.names.map((name: any) => {
        return name.name;
      });

      return {
        id: data.id,
        name: koName[2],
        engName: koName[8],
        jpnName: koName[0],
        types,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
      };
    })
  );
  return { next: res.next, results: pokemons };
}
