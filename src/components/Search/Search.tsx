import { useState } from "react";
import useFlexSearch from "~/hooks/useFlexSearch";
import useDebouncedValue from "~/hooks/useDebouncedValue";
import useKeyboardNavigation from "./useKeyboardNavigation";
import SearchResults from "./SearchResults";
import SearchButton from "./SearchButton";
import SearchInput from "./SearchInput";

export default function Search() {
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
      <div className="flex h-full w-[325px] flex-col rounded-xl border-2 border-gray bg-[#fff] text-black dark:border-0 md:w-[550px] lg:w-[725px]">
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
    </>
  );
}
