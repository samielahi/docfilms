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
    <>
      {showResults && results.length !== 0 && (
        <hr className="border-t-2 border-gray bg-transparent" />
      )}
      <div
        ref={ref}
        className="max-h-[300px] w-full overflow-y-auto rounded-b-xl focus:outline-none md:max-h-[600px]"
        tabIndex={1}
      >
        {showResults && results.length !== 0 && (
          <>
            {results?.map((result, i) => (
              <SearchResult
                type={result.type}
                key={i}
                id={result.id}
                selected={selected === i}
                title={result.title}
                director={result.director}
                year={result.year}
                quarter={result.quarter}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
});
