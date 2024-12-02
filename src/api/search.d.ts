export interface SearchResponse {
  totalHits: number;
  totalHitsRelation: string;
  maxScore: number;
  empty: boolean;
  searchHits: [
    {
      id: string;
      index: string;
      score: number;
      content: {
        additionalInfoId: number;
        managementNo: string;
        buildingName: string;
        buildingNameKeyword: string;
        buildingNameNgrams: string;
        buildingNameSearchAsYouType: string;
        dongNameWithBuildingName: string;
      };
    }
  ];
}
