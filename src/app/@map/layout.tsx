'use client'

import { mapState } from "@/atoms/mapAtom";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

type Props = {
  children: React.ReactNode;
};

export default function MapLayout({ children }: Props) {

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      console.log("All JS and resources are fully loaded");
      setIsLoaded(true); // 모든 스크립트가 로드되었음을 상태에 반영
    };

    if (document.readyState === "complete") {
      // 이미 로드 완료 상태라면 바로 실행
      handleLoad();
    } else {
      // 로드 완료 시 실행
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad); // 이벤트 클린업
    };
  }, []);

  if (!isLoaded) {
    return <div>Loading...</div>; // 로드 중 상태 표시
  }

  return <>{children}</>;
}
