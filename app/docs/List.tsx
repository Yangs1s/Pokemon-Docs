/** @format */
"use client";
import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import getPokemon from "@/pages/api/getPokemon";
import { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import Badge from "../components/Badge";
import { useRecoilState } from "recoil";
import filterListState from "../store/filterAtom";

interface ResultType {
  id: number;
  name: string;
  image: string;
  engName: string;
  jpnName: string;
  types: string[];
}

interface dataType {
  pageParams: number[] | undefined;
  pages: pagesProps;
}

interface pagesProps {
  next: string;
  results: ResultType[];
}

const MAX_POKE = 1118 as number;
export default function List() {
  const [ref, inView] = useInView();
  const [pokemons, setPokemons] = useState<any>([]);
  const [type, setType] = useRecoilState(filterListState);

  // data가져오기
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery<pagesProps>(
    "pokemons",
    ({ pageParam = "" }) => getPokemon(pageParam),
    {
      getNextPageParam: lastPage => {
        const { next } = lastPage;
        // console.log(lastPage.next);
        const offset = Number(new URL(next).searchParams.get("offset"));

        if (!next) return false;
        /// 마지막페이지엔 미작동
        if (offset > MAX_POKE) {
          return undefined;
        }
        return offset;
      },
      staleTime: 10000,
    }
  );
  // 필터링 후 데이터 업데이트 시 pokemons state 없데이트
  // reduce로 했습니다. 여러가지 타입이 겹칠수도 있기도 하고 여러가지 필터링을 하는덴 개인적으로 reduce가 가장 좋은거 같아요
  useEffect(() => {
    if (data) {
      const newPokemons = data.pages.reduce(
        (acc, list: any) => acc.concat(list.results),
        []
      );
      setPokemons(newPokemons);
    }
  }, [data]);

  // infinite scroll
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, hasNextPage]);

  const filteredPokemons = useMemo(() => {
    if (!type || type.length === 0) return pokemons;
    return pokemons.filter((poke: ResultType) => {
      return type.every((t: string) => poke.types.includes(t));
    });
  }, [pokemons, type]);

  return (
    <div className="w-auto mb-3 p-3">
      <div className="mobile:max-w-full desktop:w-full grid desktop:grid-cols-8 tablet:grid-cols-2 mobile:grid-cols-1 gap-2 mobile:w-full mb-2 p-2">
        {/* 포켓몬 목록 */}
        {filteredPokemons.map((poke: ResultType) => (
          // 상태 페이지 접근을 위한 링크
          <Link
            href={`detail/${poke.id}`}
            key={poke.engName}
            as={`detail/${poke.id}`}
            className="max-w-full mobile:h-auto h-80"
          >
            {/* 포켓몬 카드 */}
            <div className="border-2 rounded-lg w-auto flex flex-col items-center h-full gap-3">
              {/* 포켓몬 이미지 */}
              <Image
                src={poke.image}
                alt="poke"
                width={240}
                height={240}
                className="
                  tablet:w-36 tablet:h-36
                  mobile:w-32 mobile:h-32 
                  desktop:w-40 desktop:h-44"
              />

              {/* 포켓몬 정보 */}
              <div className="flex flex-col items-center p-2 max-w-md gap-2">
                <span className="text-gray-400 desktop:text-xl tablet:text-lg mobile:text-md font-semibold">
                  {poke.id < 10
                    ? "NO.00" + poke.id
                    : poke.id < 100
                    ? "NO.0" + poke.id
                    : "NO." + poke.id}
                </span>
                <h1 className="font-extrabold text-base desktop:text-xl">
                  {poke.name}
                </h1>
                {/* 포켓몬 타입 */}
                <div className="flex flex-row">
                  {poke.types.map((type: any, idx) => (
                    <Badge name={type} key={type + idx} />
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* 인피니티 스크롤 로딩바*/}
      <div
        ref={ref}
        className=" p-3 flex justify-center items-center m-auto bg-slate-100 h-32"
      >
        <span className="text-xl">불러오는중입니다....!</span>
      </div>
    </div>
  );
}
