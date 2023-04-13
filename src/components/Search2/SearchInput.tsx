import { useSearch, useSearchDispatch } from "./state/SearchContext";

export default function SearchInput() {
  const { currentQuery, inputRef } = useSearch()!;
  const dispatch = useSearchDispatch()!;

  return (
    <>
      <label htmlFor="search" aria-labelledby="searchTitle">
        <title id="searchTitle">Search</title>
        {/* SVG for search icon goes here */}
      </label>

      <input
        ref={inputRef}
        id="search"
        type="text"
        autoComplete="off"
        value={currentQuery}
        onChange={(event) => {
          dispatch({
            type: "SET_QUERY",
            value: event.target.value,
          });
        }}
        placeholder="Search for movies, directors, or quarters..."
      />
    </>
  );
}
