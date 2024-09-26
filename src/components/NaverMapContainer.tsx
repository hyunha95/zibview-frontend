"use client";

import { memo, useEffect, useState } from "react";
import ReactLoading from "react-loading";

const MARKER_SPRITE_X_OFFSET = 29,
  MARKER_SPRITE_Y_OFFSET = 50,
  MARKER_SPRITE_POSITION = {
    A0: [0, 0],
    B0: [MARKER_SPRITE_X_OFFSET, 0],
    C0: [MARKER_SPRITE_X_OFFSET * 2, 0],
    D0: [MARKER_SPRITE_X_OFFSET * 3, 0],
    E0: [MARKER_SPRITE_X_OFFSET * 4, 0],
    F0: [MARKER_SPRITE_X_OFFSET * 5, 0],
    G0: [MARKER_SPRITE_X_OFFSET * 6, 0],
    H0: [MARKER_SPRITE_X_OFFSET * 7, 0],
    I0: [MARKER_SPRITE_X_OFFSET * 8, 0],

    A1: [0, MARKER_SPRITE_Y_OFFSET],
    B1: [MARKER_SPRITE_X_OFFSET, MARKER_SPRITE_Y_OFFSET],
    C1: [MARKER_SPRITE_X_OFFSET * 2, MARKER_SPRITE_Y_OFFSET],
    D1: [MARKER_SPRITE_X_OFFSET * 3, MARKER_SPRITE_Y_OFFSET],
    E1: [MARKER_SPRITE_X_OFFSET * 4, MARKER_SPRITE_Y_OFFSET],
    F1: [MARKER_SPRITE_X_OFFSET * 5, MARKER_SPRITE_Y_OFFSET],
    G1: [MARKER_SPRITE_X_OFFSET * 6, MARKER_SPRITE_Y_OFFSET],
    H1: [MARKER_SPRITE_X_OFFSET * 7, MARKER_SPRITE_Y_OFFSET],
    I1: [MARKER_SPRITE_X_OFFSET * 8, MARKER_SPRITE_Y_OFFSET],

    A2: [0, MARKER_SPRITE_Y_OFFSET * 2],
    B2: [MARKER_SPRITE_X_OFFSET, MARKER_SPRITE_Y_OFFSET * 2],
    C2: [MARKER_SPRITE_X_OFFSET * 2, MARKER_SPRITE_Y_OFFSET * 2],
    D2: [MARKER_SPRITE_X_OFFSET * 3, MARKER_SPRITE_Y_OFFSET * 2],
    E2: [MARKER_SPRITE_X_OFFSET * 4, MARKER_SPRITE_Y_OFFSET * 2],
    F2: [MARKER_SPRITE_X_OFFSET * 5, MARKER_SPRITE_Y_OFFSET * 2],
    G2: [MARKER_SPRITE_X_OFFSET * 6, MARKER_SPRITE_Y_OFFSET * 2],
    H2: [MARKER_SPRITE_X_OFFSET * 7, MARKER_SPRITE_Y_OFFSET * 2],
    I2: [MARKER_SPRITE_X_OFFSET * 8, MARKER_SPRITE_Y_OFFSET * 2],
  };

const NaverMapContainer = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const map = new naver.maps.Map("naver-map-id", {
      center: new naver.maps.LatLng(37.3595704, 127.105399),
      zoom: 15,
    });
    const bounds = map.getBounds() as naver.maps.LatLngBounds;
    const southWest = bounds.getSW();
    const northEast = bounds.getNE();
    const lngSpan = northEast.lng() - southWest.lng();
    const latSpan = northEast.lat() - southWest.lat();

    const updateMarkers = (map: NaverMap, markers: NaverMarker[]) => {
      const mapBounds = map.getBounds() as naver.maps.LatLngBounds;
      let marker, position;

      for (let i = 0; i < markers.length; i++) {
        marker = markers[i];
        position = marker.getPosition();

        if (mapBounds.hasLatLng(position)) {
          showMarker(map, marker);
        } else {
          hideMarker(map, marker);
        }
      }
    };

    const showMarker = (map: NaverMap, marker: NaverMarker) => {
      // if (marker.setMap()) return;
      marker.setMap(map);
    };

    const hideMarker = (map: NaverMap, marker: NaverMarker) => {
      // if (!marker.setMap()) return;
      marker.setMap(null);
    };

    const markers: NaverMarker[] = [];

    for (const key in MARKER_SPRITE_POSITION) {
      const position = new naver.maps.LatLng(
        southWest.lat() + latSpan * Math.random(),
        southWest.lng() + lngSpan * Math.random()
      );

      const markerHTML = `
      <div id="marker" style="position: relative; width: 60px; height: 60px;">
        <svg style="filter: drop-shadow(0px 6px 4px rgba(0, 0, 0, 0.6));" xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="#f97316" stroke="#f97316" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        <span class="price" style="position: absolute; top:9px; left:50%; transform: translate(-50%, 0); width: 100%; text-align: center; font-size: 14px; font-weight: bold; color: white;">5.5억</span>
        <span class="size" style="position: absolute; bottom:16px; left:50%; transform: translate(-50%, 0); font-size: 12px; color: white;">32평</span>
      </div>`;

      const marker = new naver.maps.Marker({
        map: map,
        position: position,
        title: key,
        icon: {
          content: markerHTML,
          origin: new naver.maps.Point(
            MARKER_SPRITE_POSITION[
              key as keyof typeof MARKER_SPRITE_POSITION
            ][0],
            MARKER_SPRITE_POSITION[
              key as keyof typeof MARKER_SPRITE_POSITION
            ][1]
          ),
        },
        zIndex: 100,
      });

      naver.maps.Event.addListener(marker, "click", () => console.log(111));

      markers.push(marker);
    }

    // 컴포넌트가 마운트될 때 이벤트 리스너를 등록
    // const idleListener = naver.maps.Event.addListener(map, "idle", () => {
    //   updateMarkers(map, markers);
    // });
    const zoomChangedListener = naver.maps.Event.addListener(
      map,
      "zoom_changed",
      function () {
        updateMarkers(map, markers);
      }
    );

    const dragendListener = naver.maps.Event.addListener(
      map,
      "dragend",
      function () {
        updateMarkers(map, markers);
      }
    );

    setLoading(false);

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 해제
    return () => {
      // naver.maps.Event.removeListener(idleListener);
      naver.maps.Event.removeListener(zoomChangedListener);
      naver.maps.Event.removeListener(dragendListener);
    };
  }, []);

  return (
    <>
      {loading && (
        <div className="h-screen w-screen flex items-center justify-center">
          <ReactLoading type="spin" color="#f97316" />
        </div>
      )}
      <div id="naver-map-id" className="h-screen w-screen"></div>
    </>
  );
};

export default memo(NaverMapContainer);
