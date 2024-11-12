import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";

export default function News() {
  return (
    <>
      <div className="w-full border rounded-md">
        <Link href="#" className="inline-block p-3 space-y-2">
          <h4 className="text-sm font-semibold leading-4">
            왜 우리집은 안 오르지?"…서울 집값, '여기'만 오른다[복덕방기자들]
          </h4>
          <div className="flex items-center h-3 space-x-2 text-sm">
            <span className="text-gray-500 text-xs">이데일리</span>
            <Separator orientation="vertical" />
            <span className="text-gray-500 text-xs">18일 전</span>
          </div>
        </Link>
        <Separator className="w-11/12 mx-auto" />
        <Link href="#" className="inline-block p-3 space-y-2">
          <h4 className="text-sm font-semibold leading-4">
            왜 우리집은 안 오르지?"…서울 집값, '여기'만 오른다[복덕방기자들]
          </h4>
          <div className="flex items-center h-3 space-x-2 text-sm">
            <span className="text-gray-500 text-xs">이데일리</span>
            <Separator orientation="vertical" />
            <span className="text-gray-500 text-xs">18일 전</span>
          </div>
        </Link>
        <Separator className="w-11/12 mx-auto" />
        <Link href="#" className="inline-block p-3 space-y-2">
          <h4 className="text-sm font-semibold leading-4">
            왜 우리집은 안 오르지?"…서울 집값, '여기'만 오른다[복덕방기자들]
          </h4>
          <div className="flex items-center h-3 space-x-2 text-sm">
            <span className="text-gray-500 text-xs">이데일리</span>
            <Separator orientation="vertical" />
            <span className="text-gray-500 text-xs">18일 전</span>
          </div>
        </Link>
      </div>
      <Link href="#" className="px-4 py-1 mx-auto text-sm border rounded-full">
        경기도 판교 뉴스 더보기
      </Link>
    </>
  );
}
