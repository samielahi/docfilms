import { createContext } from "react";

export type SearchBarType = "main" | "mini" | "builder";

export const SearchContext = createContext<SearchBarType>("main");
