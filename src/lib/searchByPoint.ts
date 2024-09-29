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

export const searchByPoints = async (
  x: number,
  y: number,
  utmkLngSpan: number,
  utmkLatSpan: number
) => {
  const response = await fetch(
    `http://localhost:8080/api/jibuns/search-by-utmk?utmkX=${x}&utmkY=${y}&utmkXSpan=${utmkLngSpan}&utmkYSpan=${utmkLatSpan}`
  );

  const body: JibunSearchResponse[] = await response.json();

  console.log(body);

  return body;
};
