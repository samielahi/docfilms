import Icon from "../Icon";
import { useSearch, useSearchDispatch } from "./SearchContext";
import { useRouter } from "next/router";

export default function SearchInput() {
  const { currentQuery, fullSize, showResults, inputRef } = useSearch()!;
  const dispatch = useSearchDispatch()!;
  const router = useRouter();

  return (
    <>
      <label htmlFor="search" aria-labelledby="searchTitle">
        <title id="searchTitle">Search</title>
        <Icon name="search" />
      </label>

      <input
        ref={inputRef}
        className={`w-full bg-black text-sm outline-none placeholder:bg-black placeholder:text-gray md:text-base ${
          fullSize ? "md:h-[35px] md:text-xl" : ""
        }`}
        id="search"
        type="text"
        autoComplete="off"
        value={currentQuery}
        onFocus={() => {
          // If the results are hidden and user focuses input, show results
          if (!showResults) {
            dispatch({
              type: "SHOW_RESULTS",
            });
          }
        }}
        onChange={(event) => {
          // If the results are hidden and user starts typing again, show results
          if (!showResults) {
            dispatch({
              type: "SHOW_RESULTS",
            });
          }

          dispatch({
            type: "SET_QUERY",
            value: event.target.value,
          });
        }}
        // Simulate a form get action and route to search results page
        onKeyDown={(event) => {
          if (currentQuery.length && event.key === "Enter") {
            // router.push returns a Promise, void to get around eslint
            void router.push(`/search?q=${currentQuery}`);
            dispatch({
              type: "CLEAR_QUERY",
            });
          }
        }}
        placeholder="Search for a movie or director"
      />
    </>
  );
}
