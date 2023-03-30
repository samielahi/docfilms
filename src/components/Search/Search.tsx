import { useState } from "react";
import useFlexSearch from "~/hooks/useFlexSearch";
import useKeyNav from "./useKeyNav";
import SearchResults from "./SearchResults";
import SearchButton from "./SearchButton";
import SearchInput from "./SearchInput";
import { SearchContext } from "./SearchContext";

export default function Search() {
  const [query, setQuery] = useState("");
  const { searchResults, isError } = useFlexSearch(query);
  const [selectedResult, setSelectedResult] = useState(-1);
  const { inputRef, resultsRef } = useKeyNav(
    query,
    searchResults!,
    selectedResult,
    setSelectedResult
  );

  if (!searchResults || isError) return <div>An error occurred.</div>;

  // Could optimize but really not worth it at this scale
  const contextValue = {
    currentQuery: query,
    selectedResult: selectedResult,
    setQuery: setQuery,
    setSelectedResult: setSelectedResult,
  };


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
