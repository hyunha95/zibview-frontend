"use client";

import Link from "next/link";

import { AlignJustify, Bell, Search } from "lucide-react";

export default function NaverMapLeftSide() {
  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <div>
          <AlignJustify />
        </div>
        <div>
          <Bell />
        </div>
      </div>
      <div className="w-full h-14 border-[3px] border-orange-300 rounded-md flex items-center pl-5 mb-3">
        <Search className="text-orange-400" />
        <Link
          href="/search"
          className="pl-3 rounded-full text-gray-500 leading-none"
        >
          검색어를 입력하세요.
        </Link>
      </div>

      <div className="flex items-center gap-x-2 border p-1 rounded-md">
        <Link
          href="#"
          className="bg-gradient-to-r from-pink-500 to-orange-500 inline-block px-2 py-2 rounded-md min-w-fit"
        >
          <h2 className="text font-semibold text-white leading-none">실시간</h2>
        </Link>
        <div className="grid grid-cols-10 w-full">
          <span className="col-span-1 font-bold text-orange-600 text-center">
            1
          </span>
          <span className="col-span-7 font-semibold">서울 강남구 대치동</span>
          <span className="col-span-2 text-center font-semibold">1,500</span>
        </div>
      </div>
    </div>
  );
}

{
  /* <button
        onClick={() => setActive("APARTMENT")}
        className={`flex flex-col items-center gap-0.5 py-1 rounded-md drop-shadow-lg shadow-inner ${
          active === "APARTMENT" ? "bg-orange-500/80" : "bg-white"
        }`}
      >
        <Building2
          size={20}
          className={`${active === "APARTMENT" && "text-white"}`}
        />
        <span
          className={`text-xs font-semibold ${
            active === "APARTMENT" && "text-white"
          }`}
        >
          아파트
        </span>
      </button>
      <button
        onClick={() => setActive("OFFICETEL")}
        className={`flex flex-col items-center gap-0.5 py-1 rounded-md drop-shadow-lg shadow-inner ${
          active === "OFFICETEL" ? "bg-orange-500/80" : "bg-white"
        }`}
      >
        <Building
          size={20}
          className={`${active === "OFFICETEL" && "text-white"}`}
        />
        <span
          className={`text-xs font-semibold ${
            active === "OFFICETEL" && "text-white"
          }`}
        >
          오피스텔
        </span>
      </button> */
}
