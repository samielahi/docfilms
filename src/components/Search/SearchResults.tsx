import type { ForwardedRef } from "react";
import type { DocMovieSearchIndexResult } from "~/hooks/useFlexSearch";
import { forwardRef } from "react";
import SearchResult from "./SearchResult";

interface Props {
  selected?: number;
  movies: DocMovieSearchIndexResult[];
}

export default forwardRef(function SearchResults(
  props: Props,
  ref: ForwardedRef<HTMLDivElement | null>
) {
  const { movies, selected } = props;

  return (
    <div
      ref={ref}
      className="h-max w-full rounded-b-xl focus:outline-none"
      tabIndex={1}
    >
      {selected !== -1 ? (
        <>
          {movies?.map((movie, i) => (
            <SearchResult
              key={i}
              id={movie.id}
              selected={selected === i}
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
  );
});
