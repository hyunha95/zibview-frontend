"use client";

import { search } from "@/api/search";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { Search as SearchIcon } from "lucide-react";
import React, { useState } from "react";

export default function Search() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ["search", query],
    queryFn: () => search(query),
  });

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedIndex(-1);
    setQuery(e.target.value);
  };

  // const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   e.preventDefault(); // 브라우저 기본 동작 방지
  //   e.stopPropagation(); // 이벤트 전파 차단

  //   if (e.key === "ArrowUp") {
  //     if (selectedIndex > 0) {
  //       setSelectedIndex((prev) => prev - 1);
  //     }
  //   }

  //   if (e.key === "ArrowDown") {
  //     if (selectedIndex < data?.searchHits?.length! - 1) {
  //       console.log("arrow down");
  //       setSelectedIndex((prev) => prev + 1);
  //     }
  //   }
  // };

  return (
    <div className="relative z-50">
      <div
        className={clsx("w-full h-14 flex items-center pl-5", {
          "border border-orange-300 rounded-full": !open,
          "border-none shadow-md shadow-slate-400 rounded-t-3xl": open,
        })}
      >
        <SearchIcon className="text-orange-400 mr-2" />
        <input
          type="text"
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          onClick={() => setOpen(true)}
          placeholder="검색어를 입력하세요."
          value={query}
          onChange={inputHandler}
          // onKeyDown={keyDownHandler}
          className="w-full mx-2 text-base outline-none placeholder:text-gray-400"
        />
      </div>
      <ul
        className={clsx(
          "shadow-md shadow-slate-400 block absolute top-14 w-full bg-white border-t rounded-b-3xl p-2",
          {
            hidden: !open,
          }
        )}
      >
        {!data?.searchHits?.length && (
          <li className="py-10 px-2 flex gap-x-2 rounded-3xl">
            <span className="text-sm mx-auto">
              최근 검색어 내역이 없습니다.
            </span>
          </li>
        )}
        {data?.searchHits?.map((item, index) => (
          <li
            className={clsx(
              "py-2 px-2 flex gap-x-2 rounded-3xl hover:bg-slate-100"
              // {
              //   "bg-slate-100": selectedIndex === index,
              // }
            )}
          >
            <div className="relative h-6 w-6 bg-slate-200 rounded-full">
              <SearchIcon
                size={15}
                color="#94a3b8"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              />
            </div>
            <span className="text-sm">
              {item.content.dongNameWithBuildingName}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
