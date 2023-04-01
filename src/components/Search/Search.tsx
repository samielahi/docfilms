import { useState } from "react";
import useFlexSearch from "~/hooks/useFlexSearch";
import useDebouncedValue from "~/hooks/useDebouncedValue";
import useKeyboardNavigation from "./useKeyboardNavigation";
import SearchResults from "./SearchResults";
import SearchButton from "./SearchButton";
import SearchInput from "./SearchInput";
import { SearchContext } from "./SearchContext";
import type { SearchBarType } from "./SearchContext";

export default function Search(props: { type: SearchBarType }) {
  const { type } = props;
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query);
  const { searchResults, isError } = useFlexSearch(debouncedQuery);
  const [selectedResult, setSelectedResult] = useState(-1);
  const [showResults, setShowResults] = useState(true);
  const { inputRef, resultsRef } = useKeyboardNavigation(
    debouncedQuery,
    searchResults!,
    selectedResult,
    showResults,
    setShowResults,
    setSelectedResult
  );

  if (!searchResults || isError) return <div>An error occurred.</div>;

  return (
    <>
      <SearchContext.Provider value={type}>
        <div
          className={`relative z-[9999] flex h-full w-[250px] flex-col rounded-xl border-2 border-gray bg-[#fff] text-black drop-shadow-sm dark:border-0 sm:w-[325px] ${
            type === "main" ? "md:w-[550px] lg:w-[725px]" : ""
          }`}
        >
          <div className="relative flex">
            <SearchInput
              ref={inputRef}
              currentQuery={debouncedQuery}
              setQuery={setQuery}
            />
            <SearchButton currentQuery={debouncedQuery} />
          </div>

          <SearchResults
            ref={resultsRef}
            showResults={showResults}
            movies={searchResults}
            selected={selectedResult}
          />
        </div>
      </SearchContext.Provider>
    </>
  );
}
