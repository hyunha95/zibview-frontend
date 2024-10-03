export interface JibunSearchResponse {
  jibunId: number;
  jibunAddress: string;
  sidoName: string;
  sggName: string;
  emdName: string;
  riName: string;
  mountainYn: string;
  jibunMain: number;
  jibunSub: number;
  buildingName: string;
  legalDongCode: string;
  xCoordinate: number;
  yCoordinate: number;
  exclusiveUseArea: number;
  dealAmount: number;
}

/**
 * utmk 좌표를 기준으로 주변의 지번을 검색합니다.
 */
let currentController: AbortController | null = null;
export const searchByPoints = async (
  minX: number,
  minY: number,
  maxX: number,
  maxY: number,
  jibunIds: number[]
) => {
  // 이전 요청이 있을 경우 취소
  if (currentController) {
    currentController.abort();
  }

  currentController = new AbortController();
  const { signal } = currentController;

  const url = new URLSearchParams();
  url.append("minX", minX.toString());
  url.append("minY", minY.toString());
  url.append("maxX", maxX.toString());
  url.append("maxY", maxY.toString());
  jibunIds.forEach((id) => url.append("jibunIds[]", id.toString()));

  const response = await fetch(
    `http://localhost:8080/api/jibuns/search-by-utmk?${url.toString()}`,
    { signal }
  );

  const body: JibunSearchResponse[] = await response.json();

  return body;
};

export const findJibunById = async (id: string) => {
  const response = await fetch(`http://localhost:8080/api/jibuns/${id}`);

  const body: JibunSearchResponse = await response.json();

  return body || [];
};
