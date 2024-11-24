import Link from "next/link";
import { Search as SearchIcon } from "lucide-react";
import React from "react";

export default function Search() {
  return (
    <Link
      href="/search"
      className="pl-3 rounded-full text-gray-500 leading-none"
    >
      <div className="w-full h-14 border-[3px] border-orange-300 rounded-md flex items-center pl-5">
        <SearchIcon className="text-orange-400 mr-2" />
        <h3>검색어를 입력하세요.</h3>
      </div>
    </Link>
  );
}
