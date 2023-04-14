import { SearchProvider } from "./SearchContext";
import SearchInput from "./SearchInput";
import SearchResultList from "./SearchResultList";

type Props = { fullSize: boolean };

export default function Search({ fullSize }: Props) {
  return (
    <>
      <SearchProvider fullSize={fullSize}>
        <form
          className={`relative z-[9999] flex h-full w-[300px] flex-col rounded-xl border-2 border-gray bg-[#fff] text-black drop-shadow-sm dark:border-0 sm:w-[325px] ${
            fullSize ? "md:w-[550px] lg:w-[725px]" : ""
          }`}
        >
          <div
            role="search"
            className={`flex w-full items-center justify-between gap-4 px-4 py-2 ${
              fullSize ? "md:py-4 md:px-6" : ""
            }`}
          >
            <SearchInput />
          </div>
          <SearchResultList />
        </form>
      </SearchProvider>
    </>
  );
}
