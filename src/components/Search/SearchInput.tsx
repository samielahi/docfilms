import { useSearch, useSearchDispatch } from "./state/SearchContext";
import Image from "next/image";

export default function SearchInput() {
  const { currentQuery, fullSize } = useSearch()!;
  const dispatch = useSearchDispatch()!;

  return (
    <>
      <label htmlFor="search" aria-labelledby="searchTitle">
        <title id="searchTitle">Search</title>
        <Image
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
        className={`w-full bg-[#fff] text-sm outline-none placeholder:bg-[#fff] placeholder:italic placeholder:text-gray ${
          fullSize ? "lg:w-[500px md:text-xl" : ""
        }`}
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
