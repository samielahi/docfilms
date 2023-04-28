import { SearchProvider } from "./SearchContext";
import SearchInput from "./SearchInput";
import ClearSearch from "./ClearSearch";
import SearchResultList from "./SearchResultList";

type Props = { fullSize: boolean };

export default function Search({ fullSize }: Props) {
  return (
    <>
      <SearchProvider fullSize={fullSize}>
        <div
          className={`relative z-[9999] flex h-full w-[300px] flex-col border-[1px] border-gray/20 bg-black font-bold text-gray sm:w-[450px] ${
            fullSize ? "md:w-[550px] lg:w-[725px]" : ""
          }`}
        >
          <div
            role="search"
            className={`relative flex w-full items-center justify-between gap-4 px-4 py-2 ${
              fullSize ? "md:py-4 md:px-6" : ""
            }`}
          >
            <SearchInput />
            <ClearSearch />
          </div>
          <SearchResultList />
        </div>
      </SearchProvider>
    </>
  );
}
