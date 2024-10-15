"use client";

import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AlignJustify, Bell, Search } from "lucide-react";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";

export default function NaverMapLeftSide() {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

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

      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-xs"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        orientation="vertical"
      >
        <CarouselContent className="h-16">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="flex items-center gap-x-2 border p-1 rounded-md">
                <Link
                  href="#"
                  className="bg-gradient-to-r from-pink-500 to-orange-500 inline-block px-2 py-2 rounded-md min-w-fit"
                >
                  <h2 className="text font-semibold text-white leading-none">
                    실시간
                  </h2>
                </Link>
                <div className="grid grid-cols-10 w-full">
                  <span className="col-span-1 font-bold text-orange-600 text-center">
                    1
                  </span>
                  <span className="col-span-7 font-semibold">
                    서울 강남구 대치동
                  </span>
                  <span className="col-span-2 text-center font-semibold">
                    1,500
                  </span>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
