/** @format */
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getSearchResult(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { q }: any = req.query;
  const decodedQ = decodeURIComponent(q);

  console.log(decodedQ);
  try {
    const result = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0/`
    );

    const response = result.data;

    const pokemonList = response.results;

    const searchResult = await Promise.all(
      pokemonList.map(async (poke: any) => {
        const result = await axios.get(poke.url);
        const data = result.data;
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
          engName: koName[4],
          jpnName: koName[0],
          types,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
        };
      })
    );

    const filtered = searchResult?.filter((poke: any) => {
      if (poke.name.includes(decodedQ)) {
        return true;
      }
      return false;
    });

    console.log(filtered);
    res.status(200).json(filtered);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error" });
  }
}

// 1. 검색어를 입력한다.
// 2. 검색어에 맞는 리스트가 출력된다.
