import React from "react";
import LineChartLabel from "./LineChartLabel";
import {
  fetchJibunByManagementNo,
  fetchPastYearsTransactions,
} from "@/api/data";

export type ChartData = {
  dealDate: string;
  averageAmount: string;
  volume: number;
};

type Props = {
  jibunId: string;
};

export default async function PyungChart({ jibunId }: Props) {
  const jibun = await fetchJibunByManagementNo(jibunId);
  const pyungs = jibun.pyungs || [];
  const exclusiveUseArea =
    pyungs && pyungs.length > 0 ? pyungs[0].exclusiveUseArea : 0;

  console.log("jibun", jibun);

  const response = await fetchPastYearsTransactions(
    jibun.jibunId.toString(),
    new Date().getFullYear() - 2,
    exclusiveUseArea
  );

  const dealDateSet = new Set(response.map((item) => item.dealDate));
  const dealDates = Array.from(dealDateSet).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  const chartData = dealDates.map((date) => {
    return {
      dealDate: date,
      averageAmount: (
        response
          .filter((item) => item.dealDate === date)
          .map((item) => item.dealAmountInOneHundredMillion)
          .reduce((acc, cur) => acc + cur, 0) /
        response.filter((item) => item.dealDate === date).length
      ).toFixed(2),
      volume: response.filter((item) => item.dealDate === date).length,
    };
  }) as ChartData[];

  return (
    <>
      <LineChartLabel chartData={chartData} />
    </>
  );
}
