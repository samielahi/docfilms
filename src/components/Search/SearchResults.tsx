import type { ForwardedRef } from "react";
import type { DocMovieSearchIndexResult } from "~/hooks/useFlexSearch";
import { forwardRef } from "react";
import SearchResult from "./SearchResult";
import { useContext, useMemo } from "react";
import { SearchContext } from "./SearchContext";

interface SearchResultProps extends DocMovieSearchIndexResult {
  selected?: boolean;
}

interface SearchResultsProps {
  movies: SearchResultProps[];
}

export default forwardRef(function SearchResults(
  props: SearchResultsProps,
  ref: ForwardedRef<HTMLDivElement | null>
) {
  const { movies } = props;
  const { selectedResult } = useContext(SearchContext);

  return (
    <div
      ref={ref}
      className="h-max w-full rounded-b-xl focus:outline-none"
      tabIndex={1}
    >
      {/* <hr
        style={currentQuery === "" ? { display: "none" } : { display: "block" }}
        className="border-t-2 border-gray bg-transparent"
      /> */}

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
