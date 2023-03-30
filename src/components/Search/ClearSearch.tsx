
interface Props {
  setQuery: () => void;
}

export default function ClearSearch() {
  return (
    <>
      {/* <button
              aria-label="clear search query"
              style={queryIsEmpty ? { display: "none" } : { display: "block" }}
              onClick={clearValue}
            >
              <svg
                className="h-[25px] w-[25px] rounded-full bg-slate-100 stroke-orange p-1 text-center font-bold text-orange md:h-[35px] md:w-[35px] md:p-2"
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
            </button> */}
    </>
  );
}
