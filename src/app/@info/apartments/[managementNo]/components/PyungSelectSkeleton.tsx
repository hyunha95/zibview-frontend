import { Select, SelectTrigger } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function PyungSelectSkeleton() {
  return (
    <Select>
      <SelectTrigger className="w-1/2 h-full border-none shadow-none rounded-none focus:ring-0 text-white">
        <Skeleton className="h-[20px] w-10/12 rounded-md bg-white/50" />
      </SelectTrigger>
    </Select>
  );
}
