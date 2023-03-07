import { useState } from "react";
import useDebouncedValue from "~/hooks/useDebouncedValue";
import { api } from "~/utils/api";

export default function SearchBar() {
  const [value, setValue] = useState("");
  const debouncedValue = useDebouncedValue(value);
  const movies = api.searchMovies.byTitle.useQuery(debouncedValue);

  return (
    <>
      <div className="flex h-[24px] flex-col items-center gap-4">
        <h1 className="text-5xl font-bold">docfilms</h1>
        <div className="flex w-[400px] items-center justify-between gap-4 rounded-full border-2 border-slate-400 px-6 py-2 md:w-[700px]">
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
              className="rounded-lg bg-slate-100 p-2 text-sm text-slate-400"
            >
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
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </span>
          ) : (
            <></>
          )}
        </div>

        {movies.data ? (
          <div>
            {movies.data?.map((movie, i) => (
              <div key={i} className="flex gap-4 bg-slate-200 p-4">
                <h3>
                  {movie.title} {movie.year ? `(${movie.year})` : ""}
                </h3>
                <span>{movie.director}</span>
              </div>
            ))}
          </div>
        ) : (
          <></>
          // <span>No movies found.</span>
        )}
      </div>
    </>
  );
}
