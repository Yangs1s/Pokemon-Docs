/** @format */
"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Image from "next/image";
import Link from "next/link";
import Badge from "../components/Badge";
import Loading from "../components/loading";

const fetchSearchResults = async (searchTerm: any) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json; charset=UTF-8");

  if (searchTerm === "") {
    return [];
  }
  try {
    const encodedSearchTerm = encodeURIComponent(searchTerm);
    const response = await fetch(`/api/getSearch?q=${encodedSearchTerm}`, {
      method: "post",
      headers: headers,
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (e) {
    console.error("Network error:", e);
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

  return (
    <div className="w-screen relative top-28">
      <div className="w-full desktop:p-10 tablet:p-8 mobile:p-5">
        <h1 className="text-3xl font-extrabold">
          {"'" + searchTerm + "'"} 검색 결과
        </h1>
        <div
          className={`${
            !isLoading
              ? "grid"
              : "flex justify-center items-center w-full mobile:h-[40%] desktop:h-auto"
          } desktop:grid-cols-8 mobile:mt-3 mt-20 gap-3 mobile:grid-cols-2`}
        >
          {isLoading ? (
            <div className="w-full h-auto">
              <Loading />
            </div>
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
                      {poke.types?.map((type: any) => (
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
