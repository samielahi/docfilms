import SearchResult from "./SearchResult";
import { useSearch } from "./state/SearchContext";
import useFlexSearch from "~/hooks/useFlexSearch";
import useDebouncedValue from "~/hooks/useDebouncedValue";
import { useFocusCycle } from "~/hooks/useFocusCycle";

export default function SearchResultList() {
  const { currentQuery, showResults } = useSearch()!;
  const debouncedQuery = useDebouncedValue(currentQuery);
  const { results, isError } = useFlexSearch(debouncedQuery);
  // Include search input in list count so that focusing list[0] focuses it
  const [focusedIndex] = useFocusCycle(results ? results.length : 0, null);

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
        className="flex flex-col gap-2"
      >
        {results &&
          showResults &&
          results.map((result, i) => (
            <SearchResult
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
