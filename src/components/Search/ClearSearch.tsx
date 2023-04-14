import { useSearch, useSearchDispatch } from "./SearchContext";

export default function ClearSearch() {
  const { currentQuery } = useSearch()!;
  const dispatch = useSearchDispatch()!;
  return (
    <>
      <span
        onClick={() => {
          if (currentQuery.length) {
            dispatch({
              type: "CLEAR_QUERY",
            });
          }
        }}
      >
        clear
      </span>
    </>
  );
}
