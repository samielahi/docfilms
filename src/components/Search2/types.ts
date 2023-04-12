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
  currentResults: SearchResult[];
  selectedResult: number;
  showResults: boolean;
  recentQueries: string[];
  inputRef: MutableRefObject<HTMLInputElement | null>;
  resultsRef: MutableRefObject<HTMLDivElement | null>;
}

export type Action =
  | { type: "SET_QUERY"; value: string }
  | { type: "CLEAR_QUERY" }
  | { type: "SHOW_RESULTS" }
  | { type: "HIDE_RESULTS" }
  | { type: "SELECT_RESULT"; id: number }
  // Route to the results page
  | { type: "GOTO_RESULTS" }
  // Route to the like pointed to by the selected result
  | { type: "GOTO_SELECTED_RESULT" }
  | { type: "PUSH_TO_RECENT_QUERIES"; value: string }
  | { type: "FOCUS_INPUT" }
  | { type: "FOCUS_RESULTS" };
