"use client";

import { memo, useEffect } from "react";

const NaverMap = () => {
  useEffect(() => {
    new naver.maps.Map("map", {
      center: new naver.maps.LatLng(37.3595704, 127.105399),
      zoom: 15,
    });
  }, []);

  return <div id="map" className="h-screen w-screen"></div>;
};

export default memo(NaverMap);
