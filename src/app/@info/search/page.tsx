"use client";

import { search } from "@/api/search";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Search } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ["search", query],
    queryFn: () => search(query),
  });

  console.log(data);

  return (
    <>
      <div className="grid grid-cols-10 items-center border-b border-orange-400 py-3 px-2">
        <Link href="/" className="col-span-1 place-self-end">
          <ArrowLeft strokeWidth={1} size={30} />
        </Link>
        <div className="col-span-8">
          <input
            type="text"
            autoFocus
            placeholder="검색어를 입력하세요."
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-2 text-base outline-none placeholder:text-gray-400"
          />
        </div>
        <div className="col-span-1">
          <Search className="text-orange-400" size={30} />
        </div>
      </div>
      {data?.searchHits?.map((item, index) => (
        <div
          key={item.content.id}
          className="w-full border-b border-gray-200 py-2 px-4"
        >
          <p className="">{item.content.buildingName}</p>
          <p className="text-sm text-gray-500">{item.content.address}</p>
        </div>
      ))}
    </>
  );
}
