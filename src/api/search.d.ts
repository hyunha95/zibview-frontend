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
        address: string;
        addressKeyword: string;
        addressNgrams: string;
        addressSearchAsYouType: string;
        buildingName: string;
        buildingNameKeyword: string;
        buildingNameNgrams: string;
        buildingNameSearchAsYouType: string;
        id: string;
      };
    }
  ];
}
