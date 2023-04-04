import Logo from "./Logo";
import Search from "./Search/Search";
import { useState } from "react";

export default function Header() {
  const [showSearchBar, setShowSearchBar] = useState(false);
  return (
    <header className="wrapper relative flex justify-between py-10">
      {!showSearchBar && (
        <>
          <Logo size="small" />

          <div className="absolute left-[calc(100%_-_275px)] hidden sm:left-[calc(100%_-_350px)] sm:block">
            <Search type="mini" />
          </div>

          <button onClick={() => setShowSearchBar(true)}>
            <svg
              aria-label="search"
              className="w-[35px] stroke-orange sm:hidden"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </>
      )}

      {showSearchBar && (
        <>
          <div className="relative">
            <div className="absolute top-0 left-0">
              <Search type="mini" />
            </div>
          </div>

          <button className="my-auto" onClick={() => setShowSearchBar(false)}>
            <svg
              className="h-[35px] rounded-full bg-slate-100 stroke-orange p-1 text-center font-bold text-orange"
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
        </>
      )}
    </header>
  );
}
