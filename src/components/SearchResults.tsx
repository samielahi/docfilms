import Link from "next/link";
import { useEffect, useState, useRef, MutableRefObject } from "react";
import { useRouter } from "next/router";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import type { DocMovieSearchIndexResult } from "~/hooks/useFlexSearch";

interface SearchResultProps extends DocMovieSearchIndexResult {
  selected?: boolean;
}

interface SearchResultsProps {
  movies: SearchResultProps[];
  searchInputRef: MutableRefObject<HTMLInputElement>;
}

function SearchResult(props: SearchResultProps) {
  const { title, director, year, selected } = props;
  return (
    <Link
      tabIndex={-1}
      className="outline-orange"
      href={{
        pathname: `/movies/${title}`,
        query: { year: year },
      }}
    >
      <div
        style={
          selected
            ? {
                textDecoration: "underline #DE612B",
                textDecorationThickness: "4px",
              }
            : {}
        }
        className="flex w-full cursor-pointer justify-between gap-4 rounded-b-xl bg-[#fff] p-4 decoration-orange decoration-4 underline-offset-4  hover:underline"
      >
        <h3 className="text-sm capitalize text-black md:text-lg">
          {title} {year ? `(${year})` : ""}
        </h3>
        <span className="text-sm capitalize italic text-gray md:text-lg">
          {director ? director : ""}
        </span>
      </div>
    </Link>
  );
}

export default function SearchResults(props: SearchResultsProps) {
  const { movies, searchInputRef } = props;
  const [selectedResultIndex, setSelectedResultIndex] = useState(-1);
  const resultsRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const numMovies = movies.length;

  function selectResult(e: ReactKeyboardEvent<HTMLDivElement>) {
    const key = e.key;

    switch (key) {
      case "ArrowDown":
        setSelectedResultIndex(
          selectedResultIndex === numMovies - 1 ? 0 : selectedResultIndex + 1
        );
        break;
      case "ArrowUp":
        setSelectedResultIndex(
          selectedResultIndex === 0 ? numMovies - 1 : selectedResultIndex - 1
        );
        break;
      case "Escape":
        setSelectedResultIndex(-1);
        break;
      case "Enter":
        const { title, year } = movies[selectedResultIndex]!;
        router.push(`/movies/${title}?year=${year}`);
        break;
      default:
        break;
    }
  }

  // Refactor
  function focusSearchResults(e: KeyboardEvent) {
    const key = e.key;
    setSelectedResultIndex(9999);
    if (key === "ArrowDown" && resultsRef.current) {
      setSelectedResultIndex(0);
      resultsRef.current.focus();
    }

    if (key === "Escape") {
      setSelectedResultIndex(-1);
    }

    if (key === "Enter") {
      router.push(`/search?q=${searchInputRef.current.value}`);
    }
  }

  useEffect(() => {
    searchInputRef.current.addEventListener("keydown", focusSearchResults);

    return () => {
      searchInputRef.current?.removeEventListener(
        "keydown",
        focusSearchResults
      );
    };
  }, [numMovies, searchInputRef]);

  return (
    <div className="h-max w-full rounded-b-xl">
      <hr style={!numMovies ? {display: "none"} : {}} className="text-gray/40" />
      <div
        ref={resultsRef}
        tabIndex={1}
        onKeyDown={selectResult}
        onBlur={() => setSelectedResultIndex(-1)}
        className="focus: outline-none"
      >
        {numMovies && selectedResultIndex !== -1 ? (
          <>
            {movies?.map((movie, i) => (
              <SearchResult
                key={i}
                id={movie.id}
                selected={selectedResultIndex === i}
                title={movie.title}
                director={movie.director}
                year={movie.year}
              />
            ))}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
