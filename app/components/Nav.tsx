/** @format */
"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FcSearch } from "react-icons/fc";
import { useRecoilState } from "recoil";
import { useRouter } from "next/navigation";
import { useQueryClient } from "react-query";
import axios from "axios";
import mobileState from "../store/mobileAtom";

const fetchSearchResults = async (searchTerm: any) => {
  const encodedSearchTerm = encodeURIComponent(searchTerm);
  console.log(encodedSearchTerm);
  const response = await axios.get(`/api/getSearch?q=${encodedSearchTerm}`);
  return response.data;
};

function Nav() {
  const [text, setText] = useState<string>("");
  const queryClient = useQueryClient();
  const router = useRouter();
  const [mobile, setMobile] = useRecoilState(mobileState);
  console.log(text);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text) return null;
    queryClient.prefetchQuery("search", () => fetchSearchResults(text));
    const encoded = encodeURIComponent(text);
    router.push(`/search?q=${encoded}`);
  };

  return (
    <nav
      className="
        z-10
        desktop:flex items-center
        bg-red-500 border-b-8 
        desktop:flex-row desktop:w-screen 
        desktop:max-h-full px-3 py-4 
        border-black fixed desktop:top-0
        mobile:flex-col mobile:w-full"
    >
      <Link href={"/"}>
        <Image
          alt="logo"
          src={"/pokemon.png"}
          width={140}
          height={100}
          className=""
        />
      </Link>
      <form
        action={`/api/getSearch?q=${text}`}
        className="flex desktop:m-auto rounded-sm mobile:mx-10"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="border-2 desktop:w-96 p-3 border-neutral-300 h-10 rounded-sm mobile:w-52"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setText(e.target.value)
          }
          value={text || ""}
        />
        <button
          type="submit"
          className="bg-neutral-200 rounded-sm border-[1px] border-neutral-300 w-10 flex items-center justify-center"
        >
          <FcSearch className="text-lg" />
        </button>
      </form>
    </nav>
  );
}

export default Nav;
