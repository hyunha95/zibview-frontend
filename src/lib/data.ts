import {
  JibunResponse,
  JibunSearchResponse,
  TransactionApartmentResponse,
} from "./dataTypes";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

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
    `${SERVER_URL}/api/jibuns/search-by-utmk?${url.toString()}`,
    { signal }
  );

  const body: JibunSearchResponse[] = await response.json();

  return body;
};

/**
 * 지번 ID로 지번을 검색합니다.
 */
export const fetchJibunById = async (id: string) => {
  const response = await fetch(`${SERVER_URL}/api/jibuns/${id}`);

  const body: JibunResponse = await response.json();

  return body || [];
};

export const fetchPastYearsTransactions = async (
  jibunId: number,
  fromYear: number,
  exclusiveUseArea: number
) => {
  const response = await fetch(
    `${SERVER_URL}/api/jibuns/${jibunId}/transactions?fromYear=${fromYear}&exclusiveUseArea=${exclusiveUseArea}`
  );
  const body: TransactionApartmentResponse = await response.json();

  return body;
};
