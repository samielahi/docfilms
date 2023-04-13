import type { MutableRefObject } from "react";

// Search can return three types of results and displays them in their own group
export type ResultGroup = "movie" | "director" | "quarter";

export interface SearchResult {
  id: number;
  group: ResultGroup;
  index: string;
  // If the ResultGroup is "movie" it could have a year
  year?: number;
}

export interface SearchState {
  currentQuery: string;
  showResults: boolean;
  selectedResult: number;
  recentQueries: string[];
  inputRef: MutableRefObject<HTMLInputElement | null>;
  resultsRef: MutableRefObject<HTMLDivElement | null>;
}

export type SearchAction =
  | { type: "SET_QUERY"; value: string }
  | { type: "CLEAR_QUERY" }
  | { type: "SHOW_RESULTS" }
  | { type: "HIDE_RESULTS" }
  | { type: "PUSH_TO_RECENT_QUERIES"; value: string }
  | { type: "INCREMENT_SELECTED_RESULT" }
  | { type: "DECREMENT_SELECTED_RESULT" }
  | { type: "UPDATE_RESULT_COUNT" };
