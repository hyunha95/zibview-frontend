"use client";

import { useEffect } from "react";

type Props = {
  map: NaverMap;
  markers: NaverMarker[];
};

export default function NaverMap({ map, markers }: Props) {
  useEffect(() => {}, [map, markers]); // map과 markers가 변경될 때마다 다시 리스너를 등록

  return ;
}
