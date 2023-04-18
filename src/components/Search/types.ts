import type { MutableRefObject } from "react";

// Search can return three types of results and displays them in their own group
export type ResultGroup = "movie" | "director" | "quarter" | "recent";

export interface SearchResult {
  id?: number;
  group: ResultGroup;
  index: string;
  // If the ResultGroup is "movie" it could have a year
  year?: number;
}

export interface SearchState {
  // Search bar can big or inline nested in the header
  fullSize: boolean;
  currentQuery: string;
  showResults: boolean;
  // Expose the input globally for keyboard control functionality
  inputRef: MutableRefObject<HTMLInputElement | null>;
}

export type SearchAction =
  | { type: "SET_QUERY"; value: string }
  | { type: "CLEAR_QUERY" }
  | { type: "SHOW_RESULTS" }
  | { type: "HIDE_RESULTS" };
