import { useSearch, useSearchDispatch } from "./SearchContext";

export default function ClearSearch() {
  const { currentQuery, fullSize } = useSearch()!;
  const dispatch = useSearchDispatch()!;
  return (
    <>
      {currentQuery.length > 0 && (
        <button
          className={`absolute left-[calc(100%_-_4rem)]  rounded-xl bg-gray px-2 py-1 text-sm font-bold text-orange md:left-[calc(100%_-_5rem)] ${
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
