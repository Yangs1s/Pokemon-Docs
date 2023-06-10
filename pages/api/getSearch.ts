/** @format */
import { NextApiRequest, NextApiResponse } from "next";
import { pokeProps, SearchResult } from "@/app/constants";

async function fetchResult(url: string) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json; charset=UTF-8");

  const result = await fetch(url, {
    method: "get",
    headers: headers,
  }).then(res => res.json());

  return result;
}

export default async function getSearchResult(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { q }: any = req.query;
    const decodedQ = decodeURIComponent(q);

    const response = await fetchResult(
      "https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0"
    );

    const pokemonList = response.results;
    /// 검색결과에 띄어줄 데이터들
    const searchResult = await Promise.all(
      pokemonList.map(async (poke: pokeProps) => {
        const result = await fetch(poke.url, { method: "get" }).then(res =>
          res.json()
        );
        const data = result;
        const types = data.types.map((li: any) => li.type.name);

        const koNameUrl = data.species.url;
        const resultkoName = await fetch(koNameUrl, { method: "get" }).then(
          name => name.json()
        );

        const nameData = resultkoName;
        const koName: string = nameData.names.map((name: any) => {
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

    ///검색기능
    const filtered = searchResult?.filter((poke: SearchResult) => {
      if (poke.name.includes(decodedQ)) {
        return true;
      }
      return false;
    });

    res.status(200).json(filtered);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error" });
  }
}

// 1. 검색어를 입력한다.
// 2. 검색어에 맞는 리스트가 출력된다.
