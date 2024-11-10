"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useMemo, useState } from "react";
import { TransactionApartmentResponse } from "@/lib/dataTypes";
import { ChartData } from "@/app/@info/apartments/[jibunId]/[buildingName]/[jibunAddress]/components/PyungChart";

export const description = "An interactive bar chart";
const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const chartData = [
  { date: "2024-06-21", desktop: 169, mobile: 210 },
  { date: "2024-06-22", desktop: 317, mobile: 270 },
  { date: "2024-06-23", desktop: 480, mobile: 530 },
  { date: "2024-06-24", desktop: 132, mobile: 180 },
  { date: "2024-06-25", desktop: 141, mobile: 190 },
  { date: "2024-06-26", desktop: 434, mobile: 380 },
  { date: "2024-06-27", desktop: 448, mobile: 490 },
  { date: "2024-06-28", desktop: 149, mobile: 200 },
  { date: "2024-06-29", desktop: 103, mobile: 160 },
  { date: "2024-06-30", desktop: 446, mobile: 400 },
];
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

export default function LineChartLabel({ chartData }: Props) {
  const [activeChart, setActiveChart] =
    useState<keyof typeof chartConfig>("desktop");

  // const total = useMemo(
  //   () => ({
  //     desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
  //     mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
  //   }),
  //   []
  // );

  return (
    <ResponsiveContainer width={420} height={200} className="-m-5 mt-1">
      <ComposedChart data={chartData} className="p-0 m-0">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="dealDate" fontSize={10} />
        <YAxis
          yAxisId="left"
          fontSize={10}
          tickFormatter={(tick) => `${tick}억`}
        />
        <YAxis yAxisId="right" fontSize={10} orientation="right" />
        <Tooltip />
        <Legend fontSize={10} />

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
