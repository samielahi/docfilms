import { createContext } from "react";

export type SearchBarSize = "full" | "mini";

export const SearchContext = createContext<SearchBarSize>("full");
