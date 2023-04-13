import type { FocusIndex } from "~/hooks/useFocusCycle";

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
  fullSize: boolean;
  currentQuery: string;
  showResults: boolean;
  recentQueries: string[];
}

export type SearchAction =
  | { type: "SET_QUERY"; value: string }
  | { type: "CLEAR_QUERY" }
  | { type: "SHOW_RESULTS" }
  | { type: "HIDE_RESULTS" }
  | { type: "PUSH_TO_RECENT_QUERIES"; value: string };
