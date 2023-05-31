/** @format */
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import Image from "next/image";
import Link from "next/link";
import Badge from "../components/Badge";
import Loading from "./loading";

const fetchSearchResults = async (searchTerm: any) => {
  if (searchTerm === "") {
    return [];
  }
  try {
    const encodedSearchTerm = encodeURIComponent(searchTerm);
    const response = await axios.get(`/api/getSearch?q=${encodedSearchTerm}`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export default function Page() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  useEffect(() => {
    const queryString = window.location.search;
    const param = new URLSearchParams(queryString);
    setSearchTerm(param.get("q") || "");
  }, []);

  const {
    data: filtered,
    isLoading,
    isError,
  } = useQuery(["search"], () => fetchSearchResults(searchTerm), {
    enabled: searchTerm !== "",
    staleTime: 0,
    refetchOnWindowFocus: true, // 페이지 포커스 시마다 데이터 다시 요청
  });

  if (isError) {
    return <div>Error occurred while fetching data</div>;
  }

  console.log(filtered);
  return (
    <div className="w-screen h-[90vh] relative top-24">
      <div className="w-full h-full desktop:p-10 tablet:p-8 mobile:p-5">
        <h1 className="text-3xl font-extrabold">
          {"'" + searchTerm + "'"} 검색 결과
        </h1>
        <div className="grid desktop:grid-cols-8 mobile:mt-3 mt-20 gap-3 mobile:grid-cols-2">
          {isLoading ? (
            <Loading />
          ) : filtered ? (
            filtered?.map((poke: any) => (
              <Link key={poke.name} href={`/detail/${poke.id}`}>
                <div className="border-2 flex flex-col items-center justify-center rounded-md desktop:p-3 tablet:p-4 mobile:p-9 border-neutral-500 mobile:h-48">
                  <Image
                    src={poke.image}
                    width={200}
                    height={200}
                    alt="이미지"
                    className="border-b-2 tablet:w-[100px] tablet:h-[100px]"
                  />
                  <div className="mt-3 h-32 flex flex-col">
                    <span className="text-lg font-bold text-center">
                      {poke.name}
                    </span>
                    <div className="flex flex-row justify-center items-center m-auto">
                      {poke.types.map((type: any) => (
                        <div key={type}>
                          <Badge name={type} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : null}
        </div>
      </div>
    </div>
  );
}

//TODO: 무한 스크롤 추가하자
