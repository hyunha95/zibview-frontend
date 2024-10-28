import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { CSPostHogProvider } from "./providers";
import RecoilProvider from "@/providers/RecoilProvider";
import { createCookie } from "./actions";
import { v4 as uuidv4 } from "uuid";

// TODO variable로 변경
const pretendard = localFont({
  variable: "--font-pretendard",
  src: [
    { path: "./fonts/Pretendard-Thin.woff2", weight: "100", style: "thin" },
    {
      path: "./fonts/Pretendard-ExtraLight.woff2",
      weight: "200",
      style: "extralight",
    },
    {
      path: "./fonts/Pretendard-Light.woff2",
      weight: "300",
      style: "light",
    },
    {
      path: "./fonts/Pretendard-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Pretendard-Medium.woff2",
      weight: "500",
      style: "medium",
    },
    {
      path: "./fonts/Pretendard-SemiBold.woff2",
      weight: "600",
      style: "semibold",
    },
    {
      path: "./fonts/Pretendard-Bold.woff2",
      weight: "700",
      style: "bold",
    },
    {
      path: "./fonts/Pretendard-ExtraBold.woff2",
      weight: "800",
      style: "extrabold",
    },
    {
      path: "./fonts/Pretendard-Black.woff2",
      weight: "900",
      style: "black",
    },
  ],
});

export const metadata: Metadata = {
  title: "에브리데이 집뷰",
  description: "We share information about real estate",
};

export default function RootLayout({
  children,
  info,
  map,
}: Readonly<{
  children: React.ReactNode;
  info: React.ReactNode;
  map: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          type="text/javascript"
          strategy="beforeInteractive"
          src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NCP_CLIENT_ID}&submodules=geocoder`}
        ></Script>
      </head>
      <CSPostHogProvider>
        <RecoilProvider>
          <body className={`${pretendard.variable} font-sans relative`}>
            {children}
            <main className="flex w-screen">
              {info}
              {map}
            </main>
            <Analytics />
            <SpeedInsights />
          </body>
        </RecoilProvider>
      </CSPostHogProvider>
    </html>
  );
}
