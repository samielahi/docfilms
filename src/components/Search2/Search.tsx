import SearchInput from "./SearchInput";
import { SearchProvider } from "./state/SearchContext";

export default function Search() {
  return (
    <>
      <SearchProvider>
        <SearchInput />
      </SearchProvider>
    </>
  );
}
