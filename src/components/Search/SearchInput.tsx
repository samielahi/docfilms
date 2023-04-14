import Image from "next/image";
import { useState } from "react";
import { useSearch, useSearchDispatch } from "./SearchContext";
import useFocus from "~/hooks/useFocus";
import type { MutableRefObject } from "react";

export default function SearchInput() {
  const { currentQuery, fullSize, showResults, inputRef } = useSearch()!;
  const dispatch = useSearchDispatch()!;

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
        className={`w-full bg-[#fff] text-sm outline-none placeholder:bg-[#fff] placeholder:italic placeholder:text-gray ${
          fullSize ? "lg:w-[500px md:text-xl" : ""
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
        placeholder="Search for movies, directors, or quarters..."
      />
    </>
  );
}
