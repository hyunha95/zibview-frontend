"use client";

import { memo, useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { useRouter } from "next/navigation";
import { searchByPoints } from "@/lib/data";
import { createMarkerHTML, updateMarkers } from "@/lib/mapUtils";

type LatLng = {
  lat: number;
  lng: number;
};

const NaverMapContainer = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [markers, setMarkers] = useState<NaverMarker[]>([]);
  const [latlng, setLatlng] = useState<LatLng>({
    lat: 37.3595704,
    lng: 127.105399,
  });
  const [jibunIds, setJibunIds] = useState<number[]>([]);

  console.log("markers", markers);
  console.log("jibunIds", jibunIds);

  const fetchJibuns = async (
    map: naver.maps.Map,
    latitude: number,
    longitude: number,
    registeredJibunIds: number[]
  ) => {
    const latitudeLongitude = new naver.maps.LatLng(latitude, longitude);

    const utmk = naver.maps.TransCoord?.fromLatLngToUTMK(latitudeLongitude);

    if (!utmk) return;

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
    const utmkNE = naver.maps.TransCoord?.fromLatLngToUTMK(northEastLatLng);
    const utmkSW = naver.maps.TransCoord?.fromLatLngToUTMK(southWestLatLng);

    const utmkLngSpan = utmkNE?.x - utmkSW?.x;
    const utmkLatSpan = utmkNE?.y - utmkSW?.y;

    console.log("registeredJibunIds:", registeredJibunIds);
    const jibuns = await searchByPoints(
      utmk?.x,
      utmk?.y,
      utmkLngSpan,
      utmkLatSpan,
      registeredJibunIds
    );

    setJibunIds((prev) => [...prev, ...jibuns?.map((jibun) => jibun.jibunId)]);

    for (const jibun of jibuns) {
      const currentUtmk = new naver.maps.Point(
        jibun.xCoordinate,
        jibun.yCoordinate
      );
      const position = naver.maps.TransCoord.fromUTMKToLatLng(currentUtmk); // UTMK -> LatLng

      const markerHTML = createMarkerHTML(jibun);

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
        router.push(`/apartments/${jibun.jibunId}`)
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

      setMarkers((prev) => [...prev, marker]);
    }
  };

  function initGeocoder() {
    const map = new naver.maps.Map("naver-map-id", {
      center: latlng,
      zoom: 15,
    });

    naver.maps.Event.addListener(map, "zoom_changed", function () {
      const bounds = map.getBounds() as naver.maps.LatLngBounds;
      const latitude = bounds.getSW();
      const longitude = bounds.getNE();
      setLatlng({ lat: latitude.lat(), lng: longitude.lng() });

      fetchJibuns(map, latitude.lat(), longitude.lng(), jibunIds);
      updateMarkers(map, markers);
    });

    naver.maps.Event.addListener(map, "dragend", function () {
      const bounds = map.getBounds() as naver.maps.LatLngBounds;
      const latitude = bounds.getSW();
      const longitude = bounds.getNE();
      setLatlng({ lat: latitude.lat(), lng: longitude.lng() });

      fetchJibuns(map, latitude.lat(), longitude.lng(), jibunIds);
      updateMarkers(map, markers);
    });

    fetchJibuns(map, latlng.lat, latlng.lng, jibunIds);
    setLoading(false);
  }

  useEffect(() => {
    naver.maps.onJSContentLoaded = initGeocoder;

    return () => {
      initGeocoder();
    };
  }, []);

  return (
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
  );
};

export default memo(NaverMapContainer);
