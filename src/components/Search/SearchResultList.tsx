import SearchResultItem from "./SearchResultItem";
import { useSearch } from "./SearchContext";
import useFlexSearch from "~/hooks/useFlexSearch";
import useDebouncedValue from "~/hooks/useDebouncedValue";
import { useFocusManager } from "./useFocusManager";
import useLocalStorage from "~/hooks/useLocalStorage";
import type { SearchResult } from "./types";

export default function SearchResultList() {
  const { currentQuery, showResults } = useSearch()!;
  // Search only after the user stops typing for a small window of time
  const debouncedQuery = useDebouncedValue(currentQuery);
  const { results, isError } = useFlexSearch(debouncedQuery);
  // Tracking focused result when navigating by keyboard
  const [focusedIndex] = useFocusManager(results ? results.length : 0, null);
  // const [recentQueries] = useLocalStorage<string[]>("recent_queries", []);

  if (isError) return <div>An error occurred while fetching results.</div>;

  return (
    <>
      <ul
        role="presentation"
        aria-label="search suggestions"
        tabIndex={-1}
        className="flex max-h-[650px] flex-col gap-2 overflow-y-auto border-y-[1px] border-gray/20 bg-black"
      >
        {/* {recentQueries &&
          showResults &&
          (recentQueries as string[]).map((query: string, i) => (
            <SearchResultItem
              focus={focusedIndex === i}
              key={i}
              index={query}
              group="recent"
            />
          ))} */}

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
