import LineChartLabel from "@/components/charts/LineChartLabel";
import { fetchPastYearsTransactions } from "@/lib/data";
import React from "react";

type Props = {
  jibunId: number;

  exclusiveUseArea: number;
};

export default async function PyungChart({
  jibunId,

  exclusiveUseArea,
}: Props) {
  const response = await fetchPastYearsTransactions(
    jibunId,
    new Date().getFullYear() - 2,
    exclusiveUseArea
  );
  console.log("response:", response);
  return <LineChartLabel />;
}
