import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import PyungSelectSkeleton from "./components/PyungSelectSkeleton";
import { Separator } from "@/components/ui/separator";
import PyungAccordionSelector from "./components/PyungAccordionSelector";
import PyungChartSkeleton from "./components/PyungChartSkeleton";

export default function Loading() {
  return (
    <>
      <div className="bg-orange-500">
        <h2 className="relative font-semibold py-2 text-white tracking-wide text-lg">
          <Link href="/" className="absolute left-2 top-1/2 -translate-y-1/2">
            <ArrowLeft strokeWidth={1.5} size={25} />
          </Link>
          <Skeleton className="w-20 h-6 bg-white rounded-md mx-auto" />
        </h2>

        <h3 className="text-center text-sm text-white mb-2">
          <Skeleton className="w-20 h-6 bg-white rounded-md mx-auto" />
        </h3>

        <div className="h-10 border-t border-white flex items-center">
          <PyungSelectSkeleton />
          <Separator orientation="vertical" className="bg-white" />
        </div>
      </div>
      <PyungAccordionSelector />
      <PyungChartSkeleton />
    </>
  );
}
