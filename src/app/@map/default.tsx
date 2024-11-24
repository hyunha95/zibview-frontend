"use client";

import NaverMap from "@/components/NaverMap";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchCookies } from "@/lib/data";
import Script from "next/script";
import { useEffect, useState } from "react";

export default function Default() {
  const [loading, setLoading] = useState(true);
  const [anonymousUserUUID, setAnonymousUserUUID] = useState<string | null>(
    null
  );

  useEffect(() => {
    // 컴포넌트 마운트 시 쿠키를 가져옴
    const getAnonymousUserUUID = async () => {
      const data = await fetchCookies();
      if (data?.anonymousUserUUID) {
        setAnonymousUserUUID(data.anonymousUserUUID);
      }
    };

    getAnonymousUserUUID();
  }, []);

  // 로딩 중 처리
  if (loading || !anonymousUserUUID) {
    return (
      <Skeleton className="flex justify-center items-center w-full h-screen rounded-none bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></Skeleton>
    );
  }

  return (
    <>
      <Script
        type="text/javascript"
        strategy="beforeInteractive"
        onLoad={() => setLoading(false)}
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NCP_CLIENT_ID}&submodules=geocoder`}
      ></Script>
      <NaverMap anonymousUserUUID={anonymousUserUUID} />
    </>
  );
}
