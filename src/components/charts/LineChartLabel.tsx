"use client";

import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";

import { ChartData } from "@/app/@info/apartments/[jibunId]/[buildingName]/[jibunAddress]/components/PyungChart";
import { ChartConfig } from "@/components/ui/chart";
import { useState } from "react";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

export const description = "An interactive bar chart";
const chartConfig = {
  desktop: {
    label: "최근 3년 평균",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "전체 평균",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

type Props = {
  chartData: ChartData[];
};

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-sm border-orange-600 bg-orange-500/90 p-2">
        <p className="text-sm text-white">{label}</p>

        <div className="flex flex-col">
          {payload.map((item) => (
            <p key={item.name} className="text-sm text-white">
              {item.name}: {item.value}
              {item.name === "거래량" ? "건" : "억"}
            </p>
          ))}
        </div>
      </div>
    );
  }
};

export default function LineChartLabel({ chartData }: Props) {
  const [activeChart, setActiveChart] =
    useState<keyof typeof chartConfig>("desktop");

  return (
    <ResponsiveContainer width={420} height={200} className="-m-5 mt-1">
      <ComposedChart data={chartData} className="p-0 m-0">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="dealDate" fontSize={10} />
        <YAxis yAxisId="left" fontSize={10} unit="억" />
        <YAxis yAxisId="right" fontSize={10} orientation="right" unit="건" />
        <Tooltip content={<CustomTooltip />} />
        <Legend iconSize={10} style={{ fontSize: "0.75rem" }} />

        <Bar
          yAxisId="right"
          type="monotone"
          dataKey="volume"
          name="거래량"
          fill="#82ca9d"
        />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="averageAmount"
          name="평균 거래가"
          stroke="#8884d8"
          dot={false}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
