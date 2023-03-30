import { createContext } from "react";

interface Context {
  currentQuery: string;
  selectedSearchResult: number;
  setQuery: ((query: string) => void) | null;
  setSelectedSearchResult: ((query: number) => void) | null;
}

export const SearchContext = createContext<Context>({
  currentQuery: "",
  selectedSearchResult: -1,
  setQuery: null,
  setSelectedSearchResult: null,
});
