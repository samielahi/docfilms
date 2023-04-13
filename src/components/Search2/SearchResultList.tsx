import { useSearch, useSearchDispatch } from "./state/SearchContext";
import useFlexSearch from "~/hooks/useFlexSearch";
import useDebouncedValue from "~/hooks/useDebouncedValue";
import type { ResultGroup, SearchResult } from "./types";

export default function SearchResultList() {
  const { currentQuery } = useSearch()!;
  const debouncedQuery = useDebouncedValue(currentQuery);
  // const results = useFlexSearch(debouncedQuery);

  return <div tabIndex={-1}></div>;
}

function SearchResultItem(props: Partial<SearchResult>) {
  return (
    <>
      <div>
        <div>
          {/* SVG of group goes here */}
          <p>
            {props.index} {props.year && <span> ({props.year})</span>}
          </p>
        </div>
      </div>
    </>
  );
}

function getResultIcon(group: ResultGroup) {
  switch (group) {
    case "movie":
      return "";
    case "director":
      return "";
    case "quarter":
      return "";
  }
}
