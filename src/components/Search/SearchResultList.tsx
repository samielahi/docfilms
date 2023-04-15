import SearchResultItem from "./SearchResultItem";
import { useSearch } from "./SearchContext";
import useFlexSearch from "~/hooks/useFlexSearch";
import useDebouncedValue from "~/hooks/useDebouncedValue";
import { useFocusManager } from "./useFocusManager";
import type { SearchResult } from "./types";

export default function SearchResultList() {
  const { currentQuery, showResults } = useSearch()!;
  // Search only after the user stops typing for a small window of time
  const debouncedQuery = useDebouncedValue(currentQuery);
  const { results, isError } = useFlexSearch(debouncedQuery);
  // Tracking focused result when navigating by keyboard
  const [focusedIndex] = useFocusManager(results ? results.length : 0, null);

  if (isError) return <div>An error occurred while fetching results.</div>;

  return (
    <>
      {results?.length !== 0 && showResults && (
        <hr className="border-t-2 border-gray bg-transparent" />
      )}
      <ul
        role="presentation"
        aria-label="search suggestions"
        tabIndex={-1}
        className="flex max-h-[650px] flex-col gap-2 overflow-y-auto"
      >
        {results &&
          showResults &&
          results.map((result: SearchResult, i) => (
            <SearchResultItem
              key={i}
              index={result.index}
              year={result.year}
              group={result.group}
              focus={focusedIndex === i}
            />
          ))}
      </ul>
    </>
  );
}
