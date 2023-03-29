import Base from "~/layouts/Base";
import { useRouter } from "next/router";
import type { NextPageWithLayout } from "./_app";
import { ReactElement } from "react";
import useFlexSearch from "~/hooks/useFlexSearch";
import Link from "next/link";

const Search: NextPageWithLayout = () => {
  const router = useRouter();
  const query = router.query;
  const { results, isError } = useFlexSearch(query.q as string);

  results?.sort((a, b) => {
    // If both movies don't have years
    if (!a.year && !b.year) {
      return 0;
    }
    // Put a before b if b's year dne
    if (a.year && !b.year) {
      return -1;
    }
    // Put b before a if a's year dne
    if (!a.year && b.year) {
      return 1;
    }

    if (a.year === b.year) {
      return 0;
    }

    if (a.year! > b.year!) {
      return -1;
    } else {
      return 1;
    }
  });

  if (isError) {
    return <div>An error occurred while fetching your search results.</div>;
  }

  return (
    <>
      <div className="flow">
        <h2 className="w-fit bg-yellow/40 px-6 py-4 font-bold dark:bg-none">
          Search Results for : <i className="text-orange">{query.q}</i>
        </h2>
        <p role="status">
          Found {results?.length} {results?.length === 1 ? "match" : "matches"}
        </p>

        <table className="w-full table-fixed text-center">
          <thead className="border-b-4 border-gray">
            <tr>
              <th>
                <div className="flex items-center justify-center gap-2">
                  <span>Title</span>
                  <svg
                    className="text-orange"
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
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="2.18"
                      ry="2.18"
                    ></rect>
                    <line x1="7" y1="2" x2="7" y2="22"></line>
                    <line x1="17" y1="2" x2="17" y2="22"></line>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <line x1="2" y1="7" x2="7" y2="7"></line>
                    <line x1="2" y1="17" x2="7" y2="17"></line>
                    <line x1="17" y1="17" x2="22" y2="17"></line>
                    <line x1="17" y1="7" x2="22" y2="7"></line>
                  </svg>
                </div>
              </th>
              <th>
                <div className="flex items-center justify-center gap-2">
                  <span>Director</span>
                  <svg
                    className="text-orange"
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
                </div>
              </th>
              <th>
                <div className="flex items-center justify-center gap-2">
                  <span>Year</span>
                  <svg
                    className="text-orange"
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
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {results?.map((movie) => (
              <tr>
                <td className="p-6">
                  <Link href={`/movies/${movie.title}?year=${movie.year}`} className="underline decoration-orange decoration-[3px] underline-offset-4">
                    {movie.title}
                  </Link>
                </td>
                <td>
                  <Link href={`/director/${movie.director}`} className=" italic underline decoration-orange decoration-[3px] underline-offset-4">
                    {movie.director}
                  </Link>
                </td>
                <td>{movie.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

Search.getLayout = function getLayout(page: ReactElement) {
  return <Base title="Search">{page}</Base>;
};

export default Search;
