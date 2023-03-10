import type { Movies } from "@prisma/client";
import { useState } from "react";
import useDebouncedValue from "~/hooks/useDebouncedValue";
import { api } from "~/utils/api";
import SearchResult from "./SearchResult";

function SearchResults(props: {
  movies: Partial<Movies>[] | undefined;
  isLoading: boolean;
  isError: boolean;
  value: string;
}) {
  const { movies, isLoading, isError, value } = props;

  if (isLoading || isError) return <></>;

  return (
    <div className="h-[350px] w-full rounded-b-xl">
      <hr className="text-gray/40" />
      {movies!.length ? (
        <>
          {movies!.map((movie, i) => (
            <SearchResult
              key={i}
              title={movie.title}
              director={movie.director}
              year={movie.year}
            />
          ))}
        </>
      ) : (
        <>
          <div className="flex h-full w-full flex-col items-center justify-center p-4 md:text-2xl">
            <span className="w-fit italic text-gray">
              No search results found for :
            </span>
            <span className="underline decoration-orange underline-offset-4">
              {value}
            </span>
          </div>
        </>
      )}
    </div>
  );
}

export default function SearchBar() {
  const [value, setValue] = useState("");
  const debouncedValue = useDebouncedValue(value);
  const { data, isLoading, isError } = api.searchMovies.byTitle.useQuery(
    debouncedValue,
    { enabled: debouncedValue.length > 3 }
  );
  const valueIsEmpty = value === "";

  function clearValue() {
    if (!valueIsEmpty) setValue("");
  }

  return (
    <>
      <div className="flex h-full w-[300px] flex-col gap-0  rounded-xl border-2 border-transparent bg-white md:w-[500px] lg:w-[700px]">
        <div className="flex w-full items-center justify-between gap-4 px-4 py-2 md:py-4 md:px-6">
          <div className="flex items-center gap-4 md:h-[45px]">
            <svg
              className="h-[25px] w-[25px] stroke-gray md:h-[35px] md:w-[35px]"
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
              className="outline-none placeholder:italic placeholder:text-gray md:text-2xl"
              autoComplete="off"
              autoFocus
              value={value}
              onChange={(event) => {
                setValue(event.target.value);
              }}
              id="search"
              type="text"
              placeholder="Search for a movie"
              maxLength={45}
            />
          </div>

          <button
            style={valueIsEmpty ? { display: "none" } : { display: "block" }}
            onClick={clearValue}
          >
            <svg
              className="h-[25px] w-[25px] rounded-full bg-slate-100 stroke-orange p-1 text-center font-bold text-orange md:h-[35px] md:w-[35px] md:p-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <SearchResults
          value={value}
          movies={data}
          isLoading={isLoading}
          isError={isError}
        />
      </div>
    </>
  );
}
