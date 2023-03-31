import { useRouter } from "next/router";

interface Props {
  currentQuery: string;
}

export default function SearchButton(props: Props) {
  const router = useRouter();
  const { currentQuery } = props;

  function navigateToSearchResults() {
    router.push(`/search?q=${currentQuery}`);
  }

  return (
    <>
      <button
        onClick={navigateToSearchResults}
        className="h-full border-l-2 border-gray px-4 text-sm font-bold text-orange  md:text-2xl"
      >
        search
      </button>
    </>
  );
}
