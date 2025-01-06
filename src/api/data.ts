import {
  JibunResponse,
  JibunSearchResponse,
  TransactionApartmentResponse,
} from "./dataTypes";
import customFetch from "./fetch";

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
  console.log("requested api");

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
  url.append("searchedJibunIds", jibunIds.join(","));

  const response = await customFetch(
    `/api/jibuns/search-by-utmk-get?${url.toString()}`,
    { signal, credentials: "include" }
  );

  const body: JibunSearchResponse[] = await response.json();

  return body;
};

/**
 * 지번 ID로 지번을 검색합니다.
 */
export const fetchJibunByManagementNo = async (managementNo: string) => {
  const response = await customFetch(
    `/api/jibuns/management-no/${managementNo}`
  );

  const body: JibunResponse = await response.json();
  return body || {};
};

/**
 * 지번 ID로 과거 거래 내역을 검색합니다.
 * @param jibunId
 * @param fromYear
 * @param exclusiveUseArea
 * @returns
 */
export const fetchPastYearsTransactions = async (
  jibunId: number,
  fromYear: number,
  exclusiveUseArea: number
) => {
  const response = await customFetch(
    `/api/jibuns/${jibunId}/transactions?fromYear=${fromYear}&exclusiveUseArea=${exclusiveUseArea}`
  );
  const body: TransactionApartmentResponse[] = await response.json();

  return body;
};

/**
 * anonymousUserUUID를 조회하여 쿠키에 세팅
 */
export const fetchCookies = async () => {
  const response = await customFetch("/api/auth/anonymous/cookies", {
    cache: "no-store",
  });
  const body = await response.json();
  return body;
};
