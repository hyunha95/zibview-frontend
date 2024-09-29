import { ArrowLeft, Search } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function SearchPage() {
  return (
    <div className="">
      <div className="grid grid-cols-10 items-center border-b border-orange-400 py-4 px-2">
        <Link href="/" className="col-span-1 place-self-end">
          <ArrowLeft strokeWidth={1} size={30} />
        </Link>
        <div className="col-span-8">
          <input
            type="text"
            placeholder="검색어를 입력하세요."
            className="w-full pl-2 text-lg font-semibold outline-none placeholder:text-gray-400"
          />
        </div>
        <div className="col-span-1">
          <Search className="text-orange-400" size={30} />
        </div>
      </div>
    </div>
  );
}
