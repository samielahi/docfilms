import Base from "~/layouts/Base";
import { useRouter } from "next/router";
import type { NextPageWithLayout } from "./_app";
import { ReactElement } from "react";
import useFlexSearch from "~/hooks/useFlexSearch";
import Link from "next/link";

const Search: NextPageWithLayout = () => {
  const router = useRouter();
  const query = router.query.q! as string;
  console.log(query);
  const movieResults = useFlexSearch(query, "movie");
  const directorResults = useFlexSearch(query, "director");
  const quarterResults = useFlexSearch(query, "quarter");

  const numResults =
    movieResults.results?.length! +
    directorResults.results?.length! +
    quarterResults.results?.length!;

  return (
    <>
      <div className="flow">
        <h2 className="w-fit bg-yellow/40 px-6 py-4 font-bold dark:bg-none">
          Search Results for : <i className="text-orange">{query}</i>
        </h2>
        <p role="status" className="italic">
          Found {numResults} {numResults === 1 ? "match" : "matches"}
        </p>

        <h2 className="flex items-center gap-4 font-bold">
          <span>Movies</span>
          <svg
            className="text-orange md:h-[40px] md:w-[40px]"
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
        </h2>

        <table className="w-full table-fixed text-center">
          <thead className="border-b-4 border-yellow">
            <tr className="md:text-2xl">
              <th className="py-4">
                <span>Title</span>
              </th>
              <th>Director</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            {movieResults.results?.map((result, i) => (
              <>
                <tr key={i}>
                  <td className="border-yellow py-8">
                    <Link
                      href={`/movies/${result.title}?year=${result.year}`}
                      className="underline decoration-orange decoration-[3px] underline-offset-4"
                    >
                      {result.title}
                    </Link>
                  </td>
                  <td className="border-b-0 border-yellow py-8">
                    <Link
                      href={`/director/${result.director}`}
                      className=" italic underline decoration-orange decoration-[3px] underline-offset-4"
                    >
                      {result.director}
                    </Link>
                  </td>
                  <td className="border-b-0 border-yellow py-8">
                    {result.year}
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>

        {directorResults.results?.length !== 0 && (
          <>
            <h2 className="flex items-center gap-4 font-bold">
              <span>Directors</span>
              <svg
                className="text-orange md:h-[45px] md:w-[45px]"
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
            </h2>

            <div className="flex flex-col gap-4">
              {directorResults.results?.map((result, i) => (
                <Link
                  key={i}
                  className="w-fit italic underline decoration-orange decoration-[3px] underline-offset-4"
                  href={`/director/${result.director}`}
                >
                  <li>{result.director}</li>
                </Link>
              ))}
            </div>
          </>
        )}

        {quarterResults.results?.length !== 0 && (
          <>
            <h2 className="flex items-center gap-4 font-bold">
              <span>Quarters</span>
              <svg
                className={`h-[40px] text-orange md:w-[40px]`}
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
            </h2>
            <div className="flex flex-col gap-4">
              {quarterResults.results?.map((result, i) => (
                <Link
                  key={i}
                  className="w-fit italic underline decoration-orange decoration-[3px] underline-offset-4"
                  href={"/"}
                >
                  <li>{result.quarter}</li>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

Search.getLayout = function getLayout(page: ReactElement) {
  return <Base title="Search">{page}</Base>;
};

export default Search;
