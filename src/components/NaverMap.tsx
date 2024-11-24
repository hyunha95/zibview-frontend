"use client";

import { createMaker, updateMarkers } from "@/lib/mapUtils";
import { SetWithContentEquality } from "@/lib/set";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { searchByPoints } from "@/api/data";

export type JibunRef = {
  jibunId: number;
  position: naver.maps.LatLng;
};

type Props = {
  anonymousUserUUID: string;
};

export default function NaverMap({ anonymousUserUUID }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const markersRef = useRef<SetWithContentEquality<naver.maps.Marker>>(
    new SetWithContentEquality<naver.maps.Marker>((marker) => marker.getTitle())
  );

  // anonymousUserUUID 쿠키에 추가
  Cookies.set("anonymousUserUUID", anonymousUserUUID, { expires: 1 });

  // 지도 초기화
  const initMap = (lat: number, lng: number) => {
    const map = new naver.maps.Map("map", {
      center: new naver.maps.LatLng(lat, lng),
      zoom: 15,
      minZoom: 15,
      zoomControl: true, // Indicates whether a zoom control is displayed.
      zoomControlOptions: {
        // Zoom control options
        position: naver.maps.Position.TOP_RIGHT,
      },
    });
    handleIdleEvent(map);

    map.addListener("idle", async () => {
      handleIdleEvent(map);
    });

    return map;
  };

  // 지도 이동 시 이벤트 핸들러
  const handleIdleEvent = async (map: naver.maps.Map) => {
    const bounds = map.getBounds();

    const minUTMK = naver.maps.TransCoord.fromLatLngToUTMK(
      new naver.maps.LatLng(bounds.getMin().y, bounds.getMin().x)
    );

    const maxUTMK = naver.maps.TransCoord.fromLatLngToUTMK(
      new naver.maps.LatLng(bounds.getMax().y, bounds.getMax().x)
    );

    // 지도에 보이는 지번을 검색
    const jibuns = await searchByPoints(
      minUTMK.x,
      minUTMK.y,
      maxUTMK.x,
      maxUTMK.y,
      map.getZoom(),
      anonymousUserUUID
    );
    for (const jibun of jibuns) {
      const latlng = new naver.maps.LatLng(
        jibun.yCoordinate,
        jibun.xCoordinate
      );
      const position = naver.maps.TransCoord.fromUTMKToLatLng(latlng);

      // 마커 생성
      const marker = createMaker(map, position, jibun, router);
      if (!markersRef.current.has(marker)) {
        markersRef.current.add(marker);
      }
    }

    updateMarkers(map, new Set(markersRef.current.values()));
  };

  useEffect(() => {
    // 지도 초기화

    let mapInstance;
    if (searchParams.get("lat") && searchParams.get("lon")) {
      mapInstance = initMap(
        Number(searchParams.get("lat")),
        Number(searchParams.get("lon"))
      );
    } else {
      mapInstance = initMap(37.3595704, 127.105399);
    }

    return () => {
      naver.maps.Event.clearListeners(mapInstance, "tilesloaded");
      naver.maps.Event.clearListeners(mapInstance, "idle");
    };
  }, []);

  // useEffect(() => {
  //   const lat = Number(searchParams.get("lat") || 0);
  //   const lng = Number(searchParams.get("lon") || 0);

  //   const map = new naver.maps.Map("map", {
  //     center: new naver.maps.LatLng(lng, lat),
  //     zoom: 15,
  //     minZoom: 15,
  //     zoomControl: true, // Indicates whether a zoom control is displayed.
  //     zoomControlOptions: {
  //       // Zoom control options
  //       position: naver.maps.Position.TOP_RIGHT,
  //     },
  //   });
  // }, [searchParams.get("lat"), searchParams.get("lon")]);

  return (
    <>
      <div id="map" className="h-screen w-full"></div>;
    </>
  );
}
