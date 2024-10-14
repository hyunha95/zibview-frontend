import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { fetchJibunById } from "@/lib/data";
import { JibunResponse } from "@/lib/dataTypes";
import React from "react";

type Props = {
  jibunId: string;
};

export default async function PyungAccordion({ jibunId }: Props) {
  const data = await fetchJibunById(jibunId);

  return (
    <Accordion type="single" collapsible className="pl-4 pr-2">
      <AccordionItem value="item-1" style={{ border: "none" }}>
        <AccordionTrigger className="text-gray-500">
          <span>{data.houseHoldCount}세대</span>
          <span>
            {data.builtYear}년 준공 ({data.yearsSinceConstruction}
            년차)
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <div className="grid grid-cols-2 gap-y-2">
            <span>지상 층수</span>
            <span>{data.groundFloorCount}</span>
            <span>지하 층수</span>
            <span>{data.undergroundFloorCount}</span>
            <span>엘리베이터 수</span>
            <span>{data.elevatorCount}</span>
            <span>비상용 엘리베이터 수</span>
            <span>{data.emergencyElevatorCount}</span>
            <span>옥내 기계식 대수</span>
            <span>{data.indoorMechanicalParkingCount}</span>
            <span>옥외 기계식 대수</span>
            <span>{data.outdoorMechanicalParkingCount}</span>
            <span>옥내 자주식 대수</span>
            <span>{data.indoorSelfParkingCount}</span>
            <span>옥외 자주식 대수</span>
            <span>{data.outdoorSelfParkingCount}</span>
            <span>구조</span>
            <span>{data.structureName}</span>
            <span>가구 수</span>
            <span>{data.familyCount}</span>
            <span>호 수</span>
            <span>{data.hoCount}</span>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
