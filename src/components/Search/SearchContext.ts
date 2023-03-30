import { Dispatch, SetStateAction } from "react";
import { createContext } from "react";
import type { DocMovieSearchIndexResult } from "~/hooks/useFlexSearch";

interface Context {
  currentQuery?: string;
  selectedResult?: number;
  setQuery?: Dispatch<SetStateAction<string>>;
  setSelectedResult?: Dispatch<SetStateAction<number>>;
}

export const SearchContext = createContext<Context>({});
