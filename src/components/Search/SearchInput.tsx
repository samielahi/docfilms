import type { Dispatch, SetStateAction, ForwardedRef } from "react";
import { forwardRef } from "react";
import ClearSearch from "./ClearSearch";
import { useContext } from "react";
import { SearchContext } from "./SearchContext";

interface Props {
  currentQuery: string;
  setQuery: Dispatch<SetStateAction<string>>;
}

export default forwardRef(function SearchInput(
  props: Props,
  ref: ForwardedRef<HTMLInputElement>
) {
  const { currentQuery, setQuery } = props;
  const size = useContext(SearchContext);
  const fullSize = size === "full";
  return (
    <>
      <div
        role="search"
        className={`flex w-full items-center justify-between gap-4 px-4 py-2 ${
          fullSize ? "md:py-4 md:px-6" : ""
        }`}
      >
        <svg
          aria-label="search"
          className={`pointer-events-none h-[25px] w-[25px] stroke-orange ${
            fullSize ? "md:h-[35px] md:w-[35px]" : ""
          }`}
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
          ref={ref}
          aria-label="Search for movies played at docfilms"
          className={`w-full bg-[#fff] text-sm outline-none placeholder:bg-[#fff] placeholder:italic placeholder:text-gray ${
            fullSize ? "lg:w-[500px md:text-2xl" : ""
          }`}
          autoComplete="off"
          value={currentQuery}
          onChange={(event) => {
            setQuery(event.target.value);
          }}
          id="search"
          type="text"
          placeholder="Search for a movie, director, or quarter"
          maxLength={50}
        />
      </div>

      <ClearSearch currentQuery={currentQuery} setQuery={setQuery} />
    </>
  );
});
