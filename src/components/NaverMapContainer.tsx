"use client";

import { memo, useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { useRouter } from "next/navigation";
import { searchByPoints } from "@/lib/searchByPoint";
import { updateMarkers } from "@/lib/mapUtils";

const NaverMapContainer = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const latlng = new naver.maps.LatLng(37.3595704, 127.105399);

    const utmk = naver.maps.TransCoord.fromLatLngToUTMK(latlng);

    const map = new naver.maps.Map("naver-map-id", {
      center: latlng,
      zoom: 15,
    });
    const bounds = map.getBounds() as naver.maps.LatLngBounds;
    const southWest = bounds.getSW();
    const northEast = bounds.getNE();

    const northEastLatLng = new naver.maps.LatLng(
      northEast.lat(),
      northEast.lng()
    );
    const southWestLatLng = new naver.maps.LatLng(
      southWest.lat(),
      southWest.lng()
    );
    const utmkNE = naver.maps.TransCoord.fromLatLngToUTMK(northEastLatLng);
    const utmkSW = naver.maps.TransCoord.fromLatLngToUTMK(southWestLatLng);

    const utmkLngSpan = utmkNE.x - utmkSW.x;
    const utmkLatSpan = utmkNE.y - utmkSW.y;

    const markers: NaverMarker[] = [];

    const fetchJibuns = async () => {
      const jibuns = await searchByPoints(
        utmk.x,
        utmk.y,
        utmkLngSpan,
        utmkLatSpan
      );

      for (const jibun of jibuns) {
        const utmk = new naver.maps.Point(jibun.xCoordinate, jibun.yCoordinate);
        const position = naver.maps.TransCoord.fromUTMKToLatLng(utmk); // UTMK -> LatLng

        const markerHTML = `
      <div id="marker" style="position: relative; width: 70px; height: 70px;">
        <div style="z-index:9999; opacity:0; pointer-events:none; position: absolute; top: 0; left: 50%; transform: translate(-50%, -110%); background-color: white; border: 1px solid gray; border-radius: 9px; height: auto; width: max-content; padding: 4px 8px; display: flex; flex-direction: column; justify-content: center; text-align: center; box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;">
          <span style="font-weight: bold">${jibun.buildingName}</span>
          <span style="font-weight: semi-bold; font-size:15px;">${jibun.jibunAddress}</span>
        </div>
        <svg style="filter: drop-shadow(0px 6px 4px rgba(0, 0, 0, 0.6));" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="#f97316" stroke="#f97316" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        <span class="price" style="position: absolute; top:13px; left:50%; transform: translate(-50%, 0); width: 100%; text-align: center; font-size: 14px; font-weight: bold; color: white;">${jibun.dealAmount}억</span>
        <span class="size" style="position: absolute; bottom:19px; left:50%; transform: translate(-50%, 0); font-size: 13px; font-weight: semi-bold; color: white;">${jibun.exclusiveUseArea}평</span>
      </div>`;

        const marker = new naver.maps.Marker({
          map: map,
          position: position,
          title: jibun.jibunId.toString(),
          icon: {
            content: markerHTML,
            origin: new naver.maps.Point(position.lng(), position.lat()),
            anchor: new naver.maps.Point(0, 0),
          },
        });

        marker.setAnimation(naver.maps.Animation.DROP);

        naver.maps.Event.addListener(marker, "click", () =>
          router.push(`/buildings/${jibun.jibunId}`)
        );

        naver.maps.Event.addListener(marker, "mouseover", () => {
          const style =
            marker
              .getElement()
              .children[0].children[0].children[0].getAttribute("style")
              ?.replace("opacity:0", "opacity:1") || "";

          marker
            .getElement()
            .children[0].children[0].children[0].setAttribute("style", style);
        });

        naver.maps.Event.addListener(marker, "mouseout", () => {
          const style =
            marker
              .getElement()
              .children[0].children[0].children[0].getAttribute("style")
              ?.replace("opacity:1", "opacity:0") || "";

          marker
            .getElement()
            .children[0].children[0].children[0].setAttribute("style", style);
        });

        markers.push(marker);
      }
    };

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

    fetchJibuns();
    setLoading(false);

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 해제
    return () => {
      naver.maps.Event.removeListener(zoomChangedListener);
      naver.maps.Event.removeListener(dragendListener);
    };
  }, []);

  return (
    <>
      <div id="naver-map-id" className="h-screen w-full">
        {loading && (
          <div className="h-screen bg-orange-100/30 flex flex-col items-center justify-center">
            <h3 className="font-bold text-2xl mb-10">
              지도를 불러오고 있습니다...
            </h3>
            <ReactLoading type="spin" color="#f97316" />
          </div>
        )}
      </div>
    </>
  );
};

export default memo(NaverMapContainer);
