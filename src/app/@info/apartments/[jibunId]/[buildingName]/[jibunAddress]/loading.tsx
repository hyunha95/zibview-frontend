import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function loading() {
  return (
    <div>
      <div className="bg-orange-500">
        <h2 className="relative text-center font-semibold py-2 text-white tracking-wide">
          <Link href="/" className="absolute left-2 top-1/2 -translate-y-1/2">
            <ArrowLeft strokeWidth={1.5} size={25} />
          </Link>
          <span>loading..</span>
        </h2>

        <h3 className="text-center text-sm text-white mb-2">
          <span>loading..</span>
        </h3>

        <div className="h-10 border-t border-white flex items-center">
          <Select>
            <SelectTrigger className="w-1/2 h-full border-none shadow-none rounded-none focus:ring-0 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <div>Loading...</div>
            </SelectContent>
          </Select>

          <Separator orientation="vertical" className="bg-white" />
        </div>
      </div>
    </div>
  );
}
