import type { ForwardedRef } from "react";
import type { DocMovieSearchIndexResult } from "~/hooks/useFlexSearch";
import { forwardRef } from "react";
import SearchResult from "./SearchResult";

interface SearchResultProps extends DocMovieSearchIndexResult {
  selected?: boolean;
}

interface SearchResultsProps {
  movies: SearchResultProps[];
  selectedResult?: number;
}

export default forwardRef(function SearchResults(
  props: SearchResultsProps,
  ref: ForwardedRef<HTMLDivElement | null>
) {
  const { movies, selectedResult } = props;

  // function handleSearchResultKeyEvent(e: ReactKeyboardEvent<HTMLDivElement>) {
  //   const key = e.key;

  //   switch (key) {
  //     case "ArrowDown":
  //       setSelectedResultIndex(
  //         selectedResultIndex === numMovies - 1 ? 0 : selectedResultIndex + 1
  //       );
  //       break;
  //     case "ArrowUp":
  //       setSelectedResultIndex(
  //         selectedResultIndex === 0 ? numMovies - 1 : selectedResultIndex - 1
  //       );
  //       break;
  //     case "Escape":
  //       setSelectedResultIndex(-1);
  //       break;
  //     case "Enter":
  //       const { title, year } = movies[selectedResultIndex]!;
  //       router.push(`/movies/${title}?year=${year}`);
  //       break;
  //     default:
  //       break;
  //   }
  // }

  // function handleSearchInputKeyEvent(e: KeyboardEvent) {
  //   const key = e.key;

  //   setSelectedResultIndex(9999);

  //   switch (key) {
  //     case "ArrowDown":
  //       setSelectedResultIndex(0);
  //       resultsRef.current!.focus();
  //       break;

  //     case "Escape":
  //       setSelectedResultIndex(-1);
  //       break;

  //     case "Enter":
  //       router.push(`/search?q=${searchInputRef.current?.value}`);

  //     default:
  //       break;
  //   }
  // }

  // useEffect(() => {
  //   searchInputRef.current?.addEventListener(
  //     "keydown",
  //     handleSearchInputKeyEvent
  //   );

  //   return () => {
  //     searchInputRef.current?.removeEventListener(
  //       "keydown",
  //       handleSearchInputKeyEvent
  //     );
  //   };
  // }, [numMovies, searchInputRef]);

  return (
    <div
      ref={ref}
      className="h-max w-full rounded-b-xl focus:outline-none"
      tabIndex={1}
    >
      <>
        {movies?.map((movie, i) => (
          <SearchResult
            key={i}
            id={movie.id}
            selected={selectedResult === i}
            title={movie.title}
            director={movie.director}
            year={movie.year}
          />
        ))}
      </>
    </div>
  );
});
