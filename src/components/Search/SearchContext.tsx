import { createContext, useContext, useReducer, useRef } from "react";
import type { ReactNode, Dispatch } from "react";
import type { SearchAction, SearchState } from "./types";

export const SearchContext = createContext<SearchState | null>(null);
export const SearchDispatchContext =
  createContext<Dispatch<SearchAction> | null>(null);

type Props = {
  fullSize: boolean;
  children: ReactNode;
};

export function SearchProvider({ fullSize, children }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const initialState: SearchState = {
    fullSize: fullSize,
    currentQuery: "",
    showResults: true,
    inputRef: inputRef,
  };

  const [state, dispatch] = useReducer(searchReducer, initialState);

  return (
    <>
      <SearchContext.Provider value={state}>
        <SearchDispatchContext.Provider value={dispatch}>
          {children}
        </SearchDispatchContext.Provider>
      </SearchContext.Provider>
    </>
  );
}

function searchReducer(state: SearchState, action: SearchAction) {
  // Garbage Collector gonna love this...
  switch (action.type) {
    case "SET_QUERY":
      return (({ currentQuery, ...rest }) => ({
        currentQuery: action.value,
        ...rest,
      }))(state);
    case "CLEAR_QUERY":
      return (({ currentQuery, ...rest }) => ({
        currentQuery: "",
        ...rest,
      }))(state);
    case "SHOW_RESULTS":
      return (({ showResults, ...rest }) => ({
        showResults: true,
        ...rest,
      }))(state);
    case "HIDE_RESULTS":
      return (({ showResults, ...rest }) => ({
        showResults: false,
        ...rest,
      }))(state);
  }
}

export function useSearch() {
  return useContext(SearchContext);
}

export function useSearchDispatch() {
  return useContext(SearchDispatchContext);
}
