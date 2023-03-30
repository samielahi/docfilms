import { useState } from "react";
import useFlexSearch from "~/hooks/useFlexSearch";
import useKeyNav from "./useKeyNav";
import SearchResults from "./SearchResults";
import SearchButton from "./SearchButton";
import SearchInput from "./SearchInput";

export default function Search() {
  const [query, setQuery] = useState("");
  const { searchResults, isError } = useFlexSearch(query);
  const [selectedResult, setSelectedResult] = useState(-1);
  const [showResults, setShowResults] = useState(false);
  const { inputRef, resultsRef } = useKeyNav(
    query,
    searchResults!,
    selectedResult,
    setSelectedResult
  );

  if (!searchResults || isError) return <div>An error occurred.</div>;

  return (
    <>
      <div className="flex h-full w-[325px] flex-col rounded-xl border-2 border-gray bg-[#fff] text-black dark:border-0 md:w-[550px] lg:w-[725px]">
        <div className="flex">
          <SearchInput
            ref={inputRef}
            currentQuery={query}
            setQuery={setQuery}
          />
          <SearchButton currentQuery={query} />
        </div>

        <SearchResults
          ref={resultsRef}
          movies={searchResults}
          selected={selectedResult}
        />
      </div>
    </>
  );
}
