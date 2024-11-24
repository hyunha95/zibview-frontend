import { NaverNewsResponse } from "@/api/dataTypes";
import customFetch from "@/api/fetch";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React, { Fragment } from "react";

export default async function News() {
  const searchParams = new URLSearchParams();
  searchParams.append("query", "경기도 성남시");
  searchParams.append("display", "5");
  searchParams.append("start", Math.floor(Math.random() * 1000) + 1 + "");

  const data = await customFetch(
    "/api/news/naver" + "?" + searchParams.toString(),
    { cache: "no-store" }
  );
  const newsList: NaverNewsResponse = await data.json();

  return (
    <>
      <div className="w-full border rounded-md">
        {newsList.items.map((item, index) => (
          <Fragment key={index}>
            <a
              href={item.link}
              className="inline-block p-3 space-y-2"
              target="_blank"
            >
              <h4
                className="text-sm font-semibold leading-4"
                dangerouslySetInnerHTML={{ __html: item.title }}
              ></h4>
              <div className="flex items-center h-3 space-x-2 text-sm">
                <span className="text-gray-500 text-xs">이데일리</span>
                <Separator orientation="vertical" />
                <span className="text-gray-500 text-xs">18일 전</span>
              </div>
            </a>
            {index !== newsList.items.length - 1 && (
              <Separator className="w-11/12 mx-auto" />
            )}
          </Fragment>
        ))}
      </div>
      <Link href="#" className="px-4 py-1 mx-auto text-sm border rounded-full">
        경기도 판교 뉴스 더보기
      </Link>
    </>
  );
}
