import { useState } from "react";
import useFlexSearch from "~/hooks/useFlexSearch";
import useDebouncedValue from "~/hooks/useDebouncedValue";
import useKeyboardNavigation from "./useKeyboardNavigation";
import SearchResults from "./SearchResults";
import SearchButton from "./SearchButton";
import SearchInput from "./SearchInput";
import { SearchContext } from "./SearchContext";
import type { SearchBarSize } from "./SearchContext";

export default function Search(props: { size: SearchBarSize }) {
  const { size } = props;
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query);
  const movieResults = useFlexSearch(debouncedQuery, "movie");
  const directorResults = useFlexSearch(debouncedQuery, "director");
  const quarterResults = useFlexSearch(debouncedQuery, "quarter");

  if (
    movieResults.isError ||
    directorResults.isError ||
    quarterResults.isError
  ) {
    return <div>An error occurred.</div>;
  }

  const combinedResults = [
    ...movieResults.results!,
    ...directorResults.results!,
    ...quarterResults.results!,
  ];

  const { inputRef, resultsRef, showResults, selectedResult } =
    useKeyboardNavigation(debouncedQuery, combinedResults);

  return (
    <>
      <SearchContext.Provider value={size}>
        <div
          className={`relative z-[9999] flex h-full w-[300px] flex-col rounded-xl border-2 border-gray bg-[#fff] text-black drop-shadow-sm dark:border-0 sm:w-[325px] ${
            size === "full" ? "md:w-[550px] lg:w-[725px]" : ""
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
            results={combinedResults}
            selected={selectedResult}
          />
        </div>
      </SearchContext.Provider>
    </>
  );
}
