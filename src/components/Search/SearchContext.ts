import { createContext } from "react";

export type SearchBarSize = "regular" | "mini";

export const SearchContext = createContext<SearchBarSize>("regular");
