import { createContext } from "react";

export type SearchBarType = "main" | "mini"

export const SearchContext = createContext<SearchBarType>("main");
