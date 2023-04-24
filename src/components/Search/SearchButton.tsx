import { useSearch } from "./SearchContext";
import { useRouter } from "next/router";
import { useCallback } from "react";

export default function SearchButton() {
  const { currentQuery, fullSize } = useSearch()!;
  const router = useRouter();

  const routeToSearchResults = useCallback(() => {
    if (currentQuery.length > 0) {
      // router.push returns a Promise, void to get around eslint
      void router.push(`/search?q=${currentQuery}`);
    }
  }, [currentQuery, router]);

  return (
    <>
      {fullSize && (
        <button
          className="h-full rounded-lg border-2 border-gray bg-yellow px-2 py-1 text-sm font-bold text-orange md:px-4 md:text-2xl"
          onClick={routeToSearchResults}
          role="button"
        >
          search
        </button>
      )}
    </>
  );
}
