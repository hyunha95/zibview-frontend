"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";

import React, { useRef } from "react";

export default function RealTimeRanking() {
  const plugin = useRef(Autoplay({ delay: 2000 }));

  return (
    <div className="flex items-center gap-x-2 border p-1 rounded-md">
      <div className="bg-gradient-to-r from-pink-500 to-orange-500 inline-block px-2 py-2 rounded-md min-w-fit">
        <h2 className="text font-semibold text-white leading-none">실시간</h2>
      </div>

      <Carousel
        opts={{
          loop: true,
          dragFree: false,
        }}
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        orientation="vertical"
      >
        <CarouselContent className="h-10">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <Link href="#" className="grid grid-cols-10 w-full">
                <span className="col-span-1 font-bold text-orange-600 text-center ">
                  1
                </span>
                <span className="col-span-7 text-sm font-semibold self-center">
                  서울 강남구 대치동
                </span>
                <span className="col-span-2 text-sm text-center font-semibold self-center">
                  1,500
                </span>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
