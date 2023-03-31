import { Dispatch, SetStateAction, useMemo } from "react";

interface Props {
  currentQuery: string;
  setQuery: Dispatch<SetStateAction<string>>;
}

export default function ClearSearch(props: Props) {
  const { currentQuery, setQuery } = props;
  const queryIsEmpty = useMemo(() => currentQuery === "", [currentQuery]);

  function clearValue() {
    if (!queryIsEmpty) {
      setQuery("");
    }
  }

  return (
    <>
      {!queryIsEmpty ? (
        <button
          className="absolute top-[calc(50%_-_13px)] left-[65%] md:top-[calc(50%_-_18px)] md:left-[70%] lg:left-[77%]"
          aria-label="clear search query"
          onClick={clearValue}
        >
          <svg
            className="h-[26px] w-[26px] rounded-full bg-slate-100 stroke-orange p-1 text-center font-bold text-orange md:h-[36px] md:w-[36px] md:p-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      ) : (
        <></>
      )}
    </>
  );
}
