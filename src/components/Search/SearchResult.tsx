import Link from "next/link";
import type { DocMovieSearchIndexResult } from "~/hooks/useFlexSearch";

interface Props extends DocMovieSearchIndexResult {
  selected?: boolean;
}

export default function SearchResult(props: Props) {
  const { title, director, year, selected } = props;
  return (
    <Link
      tabIndex={-1}
      className="outline-orange"
      href={{
        pathname: `/movies/${title}`,
        query: { year: year },
      }}
    >
      <div
        style={
          selected
            ? {
                textDecoration: "underline #DE612B",
                textDecorationThickness: "4px",
              }
            : {}
        }
        className="flex w-full cursor-pointer justify-between gap-4 rounded-b-xl bg-[#fff] p-4 decoration-orange decoration-4 underline-offset-4  hover:underline"
      >
        <div className="flex items-center gap-4">
          <svg
            className="hidden text-orange/50 md:block"
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
          <h3 className="text-sm capitalize text-black md:text-lg">
            {title} {year ? `(${year})` : ""}
          </h3>
        </div>
        <span className="text-sm capitalize italic text-gray md:text-lg">
          {director ? director : ""}
        </span>
      </div>
    </Link>
  );
}