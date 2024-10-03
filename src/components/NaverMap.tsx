"use client";

import { searchByPoints } from "@/lib/data";
import {
  deleteNotShownJibuns,
  makeMarkerHTML,
  updateMarkers,
} from "@/lib/mapUtils";
import React, { useEffect, useRef } from "react";

export type JibunRef = {
  jibunId: number;
  position: naver.maps.LatLng;
};

export default function NaverMap() {
  const markersRef = useRef<naver.maps.Marker[]>([]);
  const jibunsRef = useRef<JibunRef[]>([]);
  const jibunIdsRef = useRef<number[]>([]);

  useEffect(() => {
    const initMap = (lat: number, lng: number) => {
      const map = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(lat, lng),
        zoom: 15,
      });

      // 지도가 로드된 후 마커를 표시
      naver.maps.Event.addListener(map, "tilesloaded", () => {
        handleIdleEvent(map);
      });

      const idleListener = naver.maps.Event.addListener(map, "idle", async () =>
        handleIdleEvent(map)
      );
      return idleListener;
    };

    const handleIdleEvent = async (map: naver.maps.Map) => {
      const bounds = map.getBounds();

      const minUTMK = naver.maps.TransCoord.fromLatLngToUTMK(
        new naver.maps.LatLng(bounds.getMin().y, bounds.getMin().x)
      );

      const maxUTMK = naver.maps.TransCoord.fromLatLngToUTMK(
        new naver.maps.LatLng(bounds.getMax().y, bounds.getMax().x)
      );

      const jibuns = await searchByPoints(
        minUTMK.x,
        minUTMK.y,
        maxUTMK.x,
        maxUTMK.y,
        jibunIdsRef.current
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

        const marker = new naver.maps.Marker({
          map: map,
          position: position,
          icon: {
            content: makeMarkerHTML(jibun),
            anchor: new naver.maps.Point(0, 0),
          },
        });

        newJibunIds.push(jibun.jibunId);
        newMakers.push(marker);
        newJibuns.push({ jibunId: jibun.jibunId, position });
      }

      jibunIdsRef.current = [...jibunIdsRef.current, ...newJibunIds];
      markersRef.current = [...markersRef.current, ...newMakers];
      jibunsRef.current = [...jibunsRef.current, ...newJibuns];
      deleteNotShownJibuns(map, jibunsRef.current);
      updateMarkers(map, markersRef.current);
    };

    const idleListener = initMap(37.3595704, 127.105399);
    return () => {
      naver.maps.Event.removeListener(idleListener);
    };
  }, []);

  return <div id="map" className="h-screen w-full"></div>;
}
