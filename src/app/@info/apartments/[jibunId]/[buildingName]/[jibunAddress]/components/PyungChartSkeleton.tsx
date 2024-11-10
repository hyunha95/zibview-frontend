import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";
import React from "react";

export default function PyungChartSkeleton() {
  return (
    <Skeleton className="w-[360px] h-[180px] mx-auto bg-gray-200/50 grid place-items-center">
      <Loader2 className="animate-spin text-orange-500" />
    </Skeleton>
  );
}
