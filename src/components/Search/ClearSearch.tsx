import { useSearch, useSearchDispatch } from "./SearchContext";

export default function ClearSearch() {
  const { currentQuery, fullSize } = useSearch()!;
  const dispatch = useSearchDispatch()!;
  return (
    <>
      {currentQuery.length > 0 && (
        <button
          className={`rounded-xl bg-slate-100 px-2 py-1 text-sm font-bold text-orange ${
            fullSize ? "md:text-lg" : ""
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
