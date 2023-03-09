import { useState } from "react";
import useDebouncedValue from "~/hooks/useDebouncedValue";
import { api } from "~/utils/api";

export default function SearchBar() {
  const [value, setValue] = useState("");
  const debouncedValue = useDebouncedValue(value);
  // const movies = api.searchMovies.byTitle.useQuery(debouncedValue);

  return (
    <>
      <div className="flex h-full w-full flex-col gap-4 rounded-full border-2 border-transparent bg-white">
        <div className="flex w-[400px] items-center justify-between gap-4 px-6 py-4 md:w-[700px]">
          <div className="flex h-[45px] items-center gap-4">
            <span className="text-slate-400">
              <svg
                className="stroke-gray"
                xmlns="http://www.w3.org/2000/svg"
                width="45"
                height="45"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>

            <input
              className="w-fit outline-none placeholder:italic placeholder:text-gray md:text-2xl"
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
          </div>

          {value !== "" ? (
            <button
              onClick={() => {
                if (value !== "") {
                  setValue("");
                }
              }}
            >
              <svg
                className=" h-[45px] w-[45px] rounded-full bg-slate-100 stroke-orange p-2 text-center font-bold text-orange"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
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
          ) : (
            <></>
          )}
        </div>

        {/* <div className="max-h-[600px] overflow-auto rounded-b-xl">
            {movies.data ? (
              <>
                <hr />
                {movies.data?.map((movie, i) => (
              
                ))}
              </>
            ) : (
              <></>
            )}
          </div> */}
      </div>
    </>
  );
}
