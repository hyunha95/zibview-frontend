export const updateMarkers = (map: NaverMap, markers: NaverMarker[]) => {
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
