import type { ForwardedRef } from "react";
import type { DocSearchIndexResult } from "~/hooks/useFlexSearch";
import { forwardRef } from "react";
import SearchResult from "./SearchResult";

interface Props {
  selected?: number;
  showResults?: boolean;
  results: DocSearchIndexResult[];
}

export default forwardRef(function SearchResults(
  props: Props,
  ref: ForwardedRef<HTMLDivElement | null>
) {
  const { results, selected, showResults } = props;

  return (
    <div
      ref={ref}
      className="h-max w-full rounded-b-xl focus:outline-none"
      tabIndex={1}
    >
      {showResults && results.length ? (
        <>
          <hr className="border-t-2 border-gray bg-transparent" />
          {results?.map((movie, i) => (
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
