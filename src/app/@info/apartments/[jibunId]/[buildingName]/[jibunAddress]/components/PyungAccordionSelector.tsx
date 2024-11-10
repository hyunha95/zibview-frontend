import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function PyungAccordionSelector() {
  return (
    <Accordion type="single" collapsible className="pl-4 pr-2">
      <AccordionItem value="item-1" style={{ border: "none" }}>
        <AccordionTrigger className="text-gray-500">
          <div className="flex">
            <Skeleton className="w-8 mr-2 bg-gray-200/50" />
            <span>세대</span>
          </div>
          <div className="flex">
            <Skeleton className="w-10 mr-2 bg-gray-200/50" />
            <span>년 준공 (</span>
            <Skeleton className="w-8 bg-gray-200/50" />
            <span>년차)</span>
          </div>
        </AccordionTrigger>
      </AccordionItem>
    </Accordion>
  );
}
