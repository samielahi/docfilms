import Image from "next/image";
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
        <Image
          role="presentation"
          src={"/search.svg"}
          width={35}
          height={35}
          alt=""
          className={`h-[25px] w-[25px] ${
            fullSize ? "md:h-[35px] md:w-[35px]" : ""
          } `}
        />
      </label>

      <input
        ref={inputRef}
        className={`w-full bg-white text-sm outline-none placeholder:bg-white placeholder:italic placeholder:text-gray ${
          fullSize ? "md:text-xl" : ""
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
          }
        }}
        placeholder="Search for movies, directors, or quarters..."
      />
    </>
  );
}
