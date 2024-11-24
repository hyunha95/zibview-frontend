import { SearchResponse } from "./search.d";
import customFetch from "./fetch";

export const search = async (query: string) => {
  const res = await customFetch(
    "/api/v1/building-search/autocomplete?query=" + query
  );
  const body: SearchResponse = await res.json();

  return body || {};
};
