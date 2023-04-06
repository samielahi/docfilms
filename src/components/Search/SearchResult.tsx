import Link from "next/link";
import type { DocSearchIndexResult } from "~/hooks/useFlexSearch";
import { useContext } from "react";
import { SearchContext } from "./SearchContext";
import type { ResultType } from "~/hooks/useFlexSearch";

export interface Props extends Partial<DocSearchIndexResult> {
  selected?: boolean;
  type?: ResultType;
}

function MovieResult(props: {
  title: string;
  director: string;
  year: number;
  fullSize: boolean;
}) {
  let { title, director, year, fullSize } = props;

  if (!fullSize) {
    director = director.split(" ")[1]!;
  }

  return (
    <>
      <div className="flex items-center gap-4">
        <svg
          className={`w-[15px] text-orange/50 sm:w-auto`}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
          <line x1="7" y1="2" x2="7" y2="22"></line>
          <line x1="17" y1="2" x2="17" y2="22"></line>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <line x1="2" y1="7" x2="7" y2="7"></line>
          <line x1="2" y1="17" x2="7" y2="17"></line>
          <line x1="17" y1="17" x2="22" y2="17"></line>
          <line x1="17" y1="7" x2="22" y2="7"></line>
        </svg>
        <h3
          className={`text-sm capitalize text-black ${
            fullSize ? "md:text-lg" : ""
          }`}
        >
          {title} {year && fullSize ? `(${year})` : ""}
        </h3>
      </div>

      <span
        className={`hidden text-sm capitalize italic text-gray sm:block ${
          fullSize ? "md:text-lg" : ""
        }`}
      >
        {director ? director : ""}
      </span>
    </>
  );
}

function DirectorResult(props: { director: string; fullSize: boolean }) {
  const { director, fullSize } = props;

  return (
    <>
      <div className="flex items-center gap-4">
        <svg
          className={`w-[15px] text-orange/50 sm:w-auto`}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m3 11 18-5v12L3 14v-3z"></path>
          <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path>
        </svg>
        <h3
          className={`text-sm capitalize text-black ${
            fullSize ? "md:text-lg" : ""
          }`}
        >
          {director}
        </h3>
      </div>
    </>
  );
}

function QuarterResult(props: { quarter: string; fullSize: boolean }) {
  const { quarter, fullSize } = props;
  return (
    <>
      <div className="flex items-center gap-4">
        <svg
          className={`w-[15px] text-orange/50 sm:w-auto`}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
          <path d="M17 14h-6"></path>
          <path d="M13 18H7"></path>
          <path d="M7 14h.01"></path>
          <path d="M17 18h.01"></path>
        </svg>
        <h3
          className={`text-sm capitalize text-black ${
            fullSize ? "md:text-lg" : ""
          }`}
        >
          {quarter}
        </h3>
      </div>
    </>
  );
}

export default function SearchResult(props: Props) {
  const { title, director, year, quarter, selected, type } = props;
  const size = useContext(SearchContext);
  const fullSize = size === "full";

  const link = ((type) => {
    switch (type) {
      case "movie":
        return `/movies/${title?.replaceAll(" ", "-")}?year=${year}`;
      case "director":
        return `/director/${director?.replaceAll(" ", "-")}`;
      default:
        return `/quarter/${quarter?.replaceAll(" ", "-")}`;
    }
  })(type);

  return (
    <Link tabIndex={-1} className="z-9999 relative outline-orange" href={link}>
      <div
        className={`${
          selected ? "underline" : ""
        }  flex w-full cursor-pointer justify-between gap-4 rounded-b-xl bg-[#fff] p-4 decoration-orange decoration-[4px] underline-offset-4 hover:underline`}
      >
        {type === "movie" && (
          <MovieResult
            title={title!}
            director={director!}
            year={year!}
            fullSize={fullSize}
          />
        )}

        {type === "director" && (
          <DirectorResult director={director!} fullSize={fullSize} />
        )}

        {type === "quarter" && (
          <QuarterResult quarter={quarter!} fullSize={fullSize} />
        )}
      </div>
    </Link>
  );
}
