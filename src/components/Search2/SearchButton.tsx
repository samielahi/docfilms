import { useSearch } from "./state/SearchContext";
import { useRouter } from "next/router";

export default function SearchButton() {
  const { currentQuery } = useSearch()!;
  const router = useRouter();

  function routeToSearchResults() {
    if (currentQuery.length > 0) {
      // router.push returns a Promise, void to get around eslint
      void router.push(`/search?q=${currentQuery}`);
    }
  }

  return (
    <>
      <button onClick={routeToSearchResults} role="button">
        Search
      </button>
    </>
  );
}
