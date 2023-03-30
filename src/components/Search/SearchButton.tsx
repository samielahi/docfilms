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
        className="z-2 h-full border-l-2 border-gray bg-transparent px-4 text-sm font-bold text-orange outline-offset-[0.5rem] focus:outline-violet md:text-2xl"
      >
        search
      </button>
    </>
  );
}
