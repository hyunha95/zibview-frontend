"use client";

import { mapState } from "@/atoms/mapAtom";
import { searchByPoints } from "@/lib/data";
import {
  deleteNotShownJibuns,
  createMaker,
  updateMarkers,
} from "@/lib/mapUtils";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";

export type JibunRef = {
  jibunId: number;
  position: naver.maps.LatLng;
};

type Props = {
  anonymousUserUUID: string;
};

export default function NaverMap({ anonymousUserUUID }: Props) {
  const router = useRouter();
  const markersRef = useRef<naver.maps.Marker[]>([]);
  const jibunsRef = useRef<JibunRef[]>([]);
  const jibunIdsRef = useRef<number[]>([]);

  useEffect(() => {
    console.log("useEffect")
    // 지도 초기화
    const initMap = (lat: number, lng: number) => {
      const map = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(lat, lng),
        zoom: 15,
      });
      handleIdleEvent(map)

      map.addListener("idle", async() => {
        handleIdleEvent(map)
      })

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

      const newMakers: naver.maps.Marker[] = [];
      const newJibunIds: number[] = [];
      const newJibuns: JibunRef[] = [];
      for (const jibun of jibuns) {
        const latlng = new naver.maps.LatLng(
          jibun.yCoordinate,
          jibun.xCoordinate
        );
        const position = naver.maps.TransCoord.fromUTMKToLatLng(latlng);

        // 마커 생성
        const marker = createMaker(map, position, jibun, router);

        newJibunIds.push(jibun.jibunId);
        newMakers.push(marker);
        newJibuns.push({ jibunId: jibun.jibunId, position });
      }

      jibunIdsRef.current = [...jibunIdsRef.current, ...newJibunIds];
      markersRef.current = [...markersRef.current, ...newMakers];
      jibunsRef.current = [...jibunsRef.current, ...newJibuns];
      const deletedJibunIds = deleteNotShownJibuns(map, jibunsRef.current);
      jibunIdsRef.current = jibunIdsRef.current.filter(
        (id) => !deletedJibunIds.includes(id)
      );
      updateMarkers(map, markersRef.current);
    };

    // 지도 초기화
    const mapInstance = initMap(37.3595704, 127.105399);
    return () => {
      naver.maps.Event.clearListeners(mapInstance, 'tilesloaded');
      naver.maps.Event.clearListeners(mapInstance, 'idle');
    };
  }, []);

  return <div id="map" className="h-screen w-full"></div>;
}
