import { useState, useRef, MutableRefObject } from "react";
import useDebouncedValue from "~/hooks/useDebouncedValue";
import useFlexSearch from "~/hooks/useFlexSearch";
import SearchResults from "./SearchResults";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query);
  const { results, isError } = useFlexSearch(debouncedQuery);
  const searchInputRef = useRef<HTMLInputElement>(null);

  if (!results || isError) return <div>An error occurred.</div>;

  const valueIsEmpty = query === "";

  function clearValue() {
    if (!valueIsEmpty) setQuery("");
  }

  return (
    <>
      <div className="flex h-full w-[325px] flex-col gap-0 rounded-xl border-2 border-gray bg-[#fff] text-black dark:border-0 md:w-[500px] lg:w-[700px]">
        <div className="flex w-full items-center justify-between gap-4 px-4 py-2 md:py-4 md:px-6">
          <div role="search" className="flex items-center gap-4 md:h-[45px]">
            <svg
              aria-label="search"
              className="h-[25px] w-[25px] stroke-gray md:h-[35px] md:w-[35px]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>

            <input
              ref={searchInputRef}
              aria-label="Search for movies played at docfilms"
              className="bg-[#fff] text-sm outline-none placeholder:bg-[#fff] placeholder:italic placeholder:text-gray md:text-2xl lg:w-[500px]"
              autoComplete="off"
              autoFocus
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
              }}
              id="search"
              type="text"
              placeholder="Search for a movie"
              maxLength={50}
            />
          </div>

          <button
            aria-label="clear search query"
            style={valueIsEmpty ? { display: "none" } : { display: "block" }}
            onClick={clearValue}
          >
            <svg
              className="h-[25px] w-[25px] rounded-full bg-slate-100 stroke-orange p-1 text-center font-bold text-orange md:h-[35px] md:w-[35px] md:p-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <SearchResults
          searchInputRef={searchInputRef as MutableRefObject<HTMLInputElement>}
          movies={results}
        />
      </div>
    </>
  );
}
