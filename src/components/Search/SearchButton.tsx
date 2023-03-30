import { useRouter } from "next/router";
import { useContext } from "react";
import { SearchContext } from "./SearchContext";

export default function SearchButton() {
  const { currentQuery } = useContext(SearchContext);
  const router = useRouter();

  function navigateToSearchResults() {
    router.push(`/search?q=${currentQuery}`);
  }

  return (
    <>
      <button
        onClick={navigateToSearchResults}
        className="z-2 h-full border-l-2 border-gray bg-transparent px-4 text-sm font-bold text-orange outline-offset-[0.5rem] focus:outline-violet md:text-2xl"
      >
        search
      </button>
    </>
  );
}
