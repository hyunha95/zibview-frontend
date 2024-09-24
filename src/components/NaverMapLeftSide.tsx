"use client";

import { Building, Building2 } from "lucide-react";
import { useState } from "react";

export default function NaverMapLeftSide() {
  const [active, setActive] = useState<"APARTMENT" | "OFFICETEL">("APARTMENT");

  return (
    <div className="ml-3 pt-3 w-12 h-ful top-12 left-0 z-50 absolute flex flex-col gap-y-2">
      <button
        onClick={() => setActive("APARTMENT")}
        className={`flex flex-col items-center gap-0.5 py-1 rounded-md drop-shadow-lg shadow-inner ${
          active === "APARTMENT" ? "bg-orange-500/80" : "bg-white"
        }`}
      >
        <Building2
          size={20}
          className={`${active === "APARTMENT" && "text-white"}`}
        />
        <span
          className={`text-xs font-semibold ${
            active === "APARTMENT" && "text-white"
          }`}
        >
          아파트
        </span>
      </button>
      <button
        onClick={() => setActive("OFFICETEL")}
        className={`flex flex-col items-center gap-0.5 py-1 rounded-md drop-shadow-lg shadow-inner ${
          active === "OFFICETEL" ? "bg-orange-500/80" : "bg-white"
        }`}
      >
        <Building
          size={20}
          className={`${active === "OFFICETEL" && "text-white"}`}
        />
        <span
          className={`text-xs font-semibold ${
            active === "OFFICETEL" && "text-white"
          }`}
        >
          오피스텔
        </span>
      </button>
    </div>
  );
}
