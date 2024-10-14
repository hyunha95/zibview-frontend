import LineChartLabel from "@/components/charts/LineChartLabel";
import { fetchJibunById, fetchPastYearsTransactions } from "@/lib/data";
import React from "react";

type Props = {
  jibunId: string;
};

export default async function PyungChart({ jibunId }: Props) {
  const jibun = await fetchJibunById(jibunId);
  const pyungs = jibun.pyungs || [];
  const exclusiveUseArea =
    pyungs && pyungs.length > 0 ? pyungs[0].exclusiveUseArea : 0;

  const response = await fetchPastYearsTransactions(
    jibunId,
    new Date().getFullYear() - 2,
    exclusiveUseArea
  );
  console.log("response:", response);
  return <LineChartLabel />;
}
