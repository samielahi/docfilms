import { useSearch, useSearchDispatch } from "./SearchContext";

export default function ClearSearch() {
  const { currentQuery, fullSize } = useSearch()!;
  const dispatch = useSearchDispatch()!;
  return (
    <>
      {currentQuery.length > 0 && (
        <button
          className={`absolute left-[calc(100%_-_3rem)] rounded-md px-2 py-1 text-sm font-bold text-orange ${
            fullSize ? "left-[calc(100%_-_5rem)] md:text-lg" : ""
          }`}
          onClick={() => {
            dispatch({
              type: "CLEAR_QUERY",
            });
          }}
        >
          clear
        </button>
      )}
    </>
  );
}
