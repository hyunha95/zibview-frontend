"use client";

import { mapState } from "@/atoms/mapAtom";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";

type Props = {
  children: React.ReactNode;
};

export default function MapLayout({ children }: Props) {
  // const [loading, setLoading] = useRecoilState(mapState);

  // useEffect(() => {
  //   naver.maps.onJSContentLoaded = () => {
  //     setLoading(false);
  //   };
  // }, [loading]);

  return <>{children}</>;
}
