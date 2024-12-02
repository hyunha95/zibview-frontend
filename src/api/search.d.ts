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
        id: number;
        buildingName: string;
        buildingNameKeyword: string;
        buildingNameNgrams: string;
        buildingNameSearchAsYouType: string;
        dongNameWithBuildingName: string;
      };
    }
  ];
}
