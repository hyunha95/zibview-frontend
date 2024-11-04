import { JibunRef } from "@/components/NaverMap";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { JibunSearchResponse } from "./dataTypes";

/**
 * 지도에 보이는 마커를 업데이트합니다.
 */
export const updateMarkers = (map: NaverMap, markers: Set<NaverMarker>) => {
  const mapBounds = map.getBounds() as naver.maps.LatLngBounds;

  markers.forEach((marker) => {
    const position = marker.getPosition();

    if (mapBounds.hasLatLng(position)) {
      showMarker(map, marker);
    } else {
      hideMarker(map, marker);
    }
  });
  // for (const marker of markers.) {
  //   const position = marker.getPosition();

  //   if (mapBounds.hasLatLng(position)) {
  //     showMarker(map, marker);
  //   } else {
  //     hideMarker(map, marker);
  //   }
  // }
};

/**
 * 마커를 지도에 보이게 합니다.
 */
const showMarker = (map: NaverMap, marker: NaverMarker) => {
  marker.setMap(map);
};

/**
 * 마커를 지도에서 숨깁니다.
 */
const hideMarker = (map: NaverMap, marker: NaverMarker) => {
  marker.setMap(null);
};

/**
 * 마커를 생성합니다.
 * @param jibun
 * @returns
 */
export const createMaker = (
  map: naver.maps.Map,
  position: naver.maps.LatLng,
  jibun: JibunSearchResponse,
  router: AppRouterInstance
) => {
  const marker = new naver.maps.Marker({
    title: jibun.jibunId.toString(),
    map: map,
    position: position,
    icon: {
      content: createMarkerHTML(jibun),
      anchor: new naver.maps.Point(0, 0),
    },
  });

  // 마커에 클릭 이벤트 리스너 추가
  naver.maps.Event.addListener(marker, "click", () =>
    router.push(
      `/apartments/${jibun.jibunId}/${jibun.buildingName}/${jibun.jibunAddress}`
    )
  );

  // 마커에 마우스 오버 이벤트 리스너 추가
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

  // 마커에 마우스 아웃 이벤트 리스너 추가
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

  return marker;
};

/**
 * 마커 HTML을 생성합니다.
 */
export const createMarkerHTML = (jibun: JibunSearchResponse) => {
  return `
  <div id="marker" style="position: relative; width: 70px; height: 70px;">
    <div style="z-index:9999; opacity:0; pointer-events:none; position: absolute; top: 0; left: 50%; transform: translate(-50%, -110%); background-color: white; border: 1px solid gray; border-radius: 9px; height: auto; width: max-content; padding: 4px 8px; display: flex; flex-direction: column; justify-content: center; text-align: center; box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;">
      <span style="font-weight: bold">${jibun.buildingName}</span>
      <span style="font-weight: semi-bold; font-size:15px;">${jibun.jibunAddress}</span>
    </div>
    <svg style="filter: drop-shadow(0px 6px 4px rgba(0, 0, 0, 0.6));" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="#f97316" stroke="#f97316" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
    <span class="price" style="position: absolute; top:13px; left:50%; transform: translate(-50%, 0); width: 100%; text-align: center; font-size: 14px; font-weight: bold; color: white;">${jibun.dealAmount}억</span>
    <span class="size" style="position: absolute; bottom:19px; left:50%; transform: translate(-50%, 0); font-size: 13px; font-weight: semi-bold; color: white;">${jibun.exclusiveUseArea}평</span>
  </div>`;
};

/**
 * 지도에 보이지 않는 지번을 메모리에서 삭제
 */
export const deleteNotShownJibuns = (map: NaverMap, jibuns: JibunRef[]) => {
  const mapBounds = map.getBounds() as naver.maps.LatLngBounds;
  let jibun, position;

  const deletedJibunIds: number[] = [];
  for (let i = 0; i < jibuns.length; i++) {
    jibun = jibuns[i];
    position = jibun.position;

    if (!mapBounds.hasLatLng(position)) {
      const jibunRef = jibuns.splice(i, 1)[0];
      deletedJibunIds.push(jibunRef.jibunId);
    }
  }

  return deletedJibunIds;
};
