import { useState } from "react";
import useDebouncedValue from "~/hooks/useDebouncedValue";
import { api } from "~/utils/api";
import Link from "next/link";

export default function SearchBar() {
  const [value, setValue] = useState("");
  const debouncedValue = useDebouncedValue(value);
  const movies = api.searchMovies.byTitle.useQuery(debouncedValue);

  return (
    <>
      <div className="flex h-full flex-col gap-4 rounded-xl border-2 border-slate-400">
        <div>
          <div className="flex w-[400px] items-center justify-between gap-4 px-6 py-4 md:w-[700px]">
            <span className="text-slate-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>

            <input
              className="w-full outline-none placeholder:italic"
              autoComplete="false"
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

            {value !== "" ? (
              <span
                onClick={() => {
                  if (value !== "") {
                    setValue("");
                  }
                }}
                className="rounded-lg bg-slate-100 p-1 text-sm text-slate-400"
              >
                esc
              </span>
            ) : (
              <></>
            )}
          </div>

          <div className="max-h-[600px] overflow-auto rounded-b-xl">
            {movies.data ? (
              <>
                <hr />
                {movies.data?.map((movie, i) => (
                  <Link
                    key={i}
                    href={`/movies/${movie.title!}?year=${movie.year!}`}
                  >
                    <div className="flex w-full cursor-pointer justify-between gap-4 p-4 hover:bg-slate-100">
                      <h3 className=" text-slate-400">
                        {movie.title} {movie.year ? `(${movie.year})` : ""}
                      </h3>
                      <span className="italic text-slate-400">
                        {movie.director}
                      </span>
                    </div>
                  </Link>
                ))}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
