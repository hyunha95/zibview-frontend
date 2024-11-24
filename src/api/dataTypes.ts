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

export interface JibunResponse {
  jibunId: number;
  apartmentName: string;
  builtYear: string | null; // 준공년월
  yearsSinceConstruction: number | null; // 준공 후 경과년수
  jibunAddress: string;
  roofName: string | null; // 지붕명
  etcRoofName: string | null; // 건축물대장 지붕 정보
  houseHoldCount: number | null; // 세대수
  familyCount: number | null; // 가구수
  hoCount: number | null; // 호수
  height: number | null; // 높이
  groundFloorCount: number | null; // 지상층수
  undergroundFloorCount: number | null; // 지하층수
  elevatorCount: number | null; // 엘리베이터수
  emergencyElevatorCount: number | null; // 비상용 엘리베이터수
  indoorMechanicalParkingCount: number | null; // 옥내기계식대수
  outdoorMechanicalParkingCount: number | null; // 옥외기계식대수
  indoorSelfParkingCount: number | null; // 옥내자주식대수
  outdoorSelfParkingCount: number | null; // 옥외자주식대수
  structureName: string | null; // 구조명
  etcStructureName: string | null; // 기타 구조명
  earthquakeResistance: string | null; // 내진설계적용여부
  earthquakeResistanceAbility: string | null; // 내진능력
  pyungs: [
    {
      transactionApartmentId: number;
      exclusiveUseArea: number;
      exclusiveUseAreaInPyung: number;
      dealAmountInOneHundredMillion: number;
      floor: number;
    }
  ];
}

export interface TransactionApartmentResponse {
  transactionApartmentId: number;
  dealDate: string;
  exclusiveUseArea: number;
  exclusiveUseAreaInPyung: number;
  dealYear: number;
  dealMonth: number;
  dealDay: number;
  dealAmountInOneHundredMillion: number; // 억 단위
  floor: number;
  builtYear: string;
  dealGbn: string;
  estateAgentSggName: string;
  apartmentDongName: string;
  sellerGbn: string;
  buyerGbn: string;
}

export interface NaverNewsResponse {
  lastBuildDate: string;
  total: number;
  start: number;
  display: number;
  items: [
    {
      title: string;
      originallink: string;
      link: string;
      description: string;
      pubDate: string;
    }
  ];
}
