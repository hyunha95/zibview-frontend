"use client";

import { fetchCookies } from "@/api/data";
import NaverMap from "@/components/NaverMap";
import { Skeleton } from "@/components/ui/skeleton";
import Script from "next/script";
import { useEffect, useState } from "react";

export default function Default() {
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
  if (!anonymousUserUUID) {
    return (
      <Skeleton className="flex justify-center items-center w-full h-screen rounded-none bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></Skeleton>
    );
  }

  return (
    <>
      <NaverMap anonymousUserUUID={anonymousUserUUID} />
    </>
  );
}
