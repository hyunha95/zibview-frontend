"use client";

import { memo, useEffect } from "react";

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
  // const [naverMap, setNaverMap] = useState<NaverMapContainer | null>(null);
  // const [markers, setMarkers] = useState<NaverMarker[]>([]);

  useEffect(() => {
    const map = new naver.maps.Map("naver-map-id", {
      center: new naver.maps.LatLng(37.3595704, 127.105399),
      zoom: 15,
    });
    // setNaverMap(map);
    const bounds = map.getBounds(),
      southWest = bounds.getSW(),
      northEast = bounds.getNE(),
      lngSpan = northEast.lng() - southWest.lng(),
      latSpan = northEast.lat() - southWest.lat();

    const updateMarkers = (map, markers) => {
      const mapBounds = map.getBounds();
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

    const showMarker = (map, marker) => {
      if (marker.setMap()) return;
      marker.setMap(map);
    };

    const hideMarker = (map, marker) => {
      if (!marker.setMap()) return;
      marker.setMap(null);
    };

    const markers = [];

    for (const key in MARKER_SPRITE_POSITION) {
      const position = new naver.maps.LatLng(
        southWest.lat() + latSpan * Math.random(),
        southWest.lng() + lngSpan * Math.random()
      );

      const marker = new naver.maps.Marker({
        map: map,
        position: position,
        title: key,
        icon: {
          url: "s",
          size: new naver.maps.Size(24, 37),
          anchor: new naver.maps.Point(12, 37),
          origin: new naver.maps.Point(
            MARKER_SPRITE_POSITION[key][0],
            MARKER_SPRITE_POSITION[key][1]
          ),
        },
        zIndex: 100,
      });

      markers.push(marker);
    }

    console.log(markers);

    // 컴포넌트가 마운트될 때 이벤트 리스너를 등록
    const idleListener = naver.maps.Event.addListener(map, "idle", () => {
      updateMarkers(map, markers);
    });

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 해제
    return () => {
      naver.maps.Event.removeListener(idleListener);
    };
  }, []);

  return <div id="naver-map-id" className="h-screen w-screen"></div>;
};

export default memo(NaverMapContainer);
