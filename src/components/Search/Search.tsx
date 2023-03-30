import { useState, useMemo, useCallback } from "react";
import useFlexSearch from "~/hooks/useFlexSearch";
import SearchResults from "./SearchResults";
import SearchButton from "./SearchButton";
import SearchInput from "./SearchInput";
import { SearchContext } from "./SearchContext";
import useKeyboardNavigation from "./useKeyboardNavigation";

export default function Search() {
  const [value, setValue] = useState("");
  const { searchResults, isError } = useFlexSearch(value);
  const [selectedResult, setSelectedResult] = useState(-1);
  const { inputRef, resultsRef } = useKeyboardNavigation();

  if (!searchResults || isError) return <div>An error occurred.</div>;

  const setQuery = useCallback((query: string) => {
    setValue(query);
  }, []);

  const setSelectedSearchResult = useCallback((result: number) => {
    setSelectedResult(result);
  }, []);

  const contextValue = useMemo(
    () => ({
      currentQuery: value,
      selectedSearchResult: selectedResult,
      setQuery: setQuery,
      setSelectedSearchResult: setSelectedSearchResult,
    }),
    [value, selectedResult, setQuery, setSelectedSearchResult]
  );

  return (
    <>
      <SearchContext.Provider value={contextValue}>
        <div className="flex h-full w-[325px] flex-col rounded-xl border-2 border-gray bg-[#fff] text-black dark:border-0 md:w-[550px] lg:w-[725px]">
          <div className="flex">
            <SearchInput ref={inputRef} />
            <SearchButton />
          </div>

          <SearchResults ref={resultsRef} movies={searchResults} />
        </div>
      </SearchContext.Provider>
    </>
  );
}
