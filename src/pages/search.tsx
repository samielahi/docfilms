import Base from "~/layouts/Base";
import { useRouter } from "next/router";
import type { NextPageWithLayout } from "./_app";
import { ReactElement } from "react";
import useFlexSearch from "~/hooks/useFlexSearch";

const Search: NextPageWithLayout = () => {
  const router = useRouter();
  const query = router.query;
  const { results, isError } = useFlexSearch(query.q as string);

  if (isError) {
    return <div>An error occurred while fetching your search results.</div>;
  }

  return (
    <>
      <div className="flow">
        <h2 className="w-fit bg-yellow px-4 font-bold">
          Search Results for: <i>{query.q}</i>
        </h2>
        <p
          role="status"
          className="underline decoration-gray decoration-4 underline-offset-4"
        >
          Found {results?.length} matches.
        </p>

        <ul className="flow ml-6">
          {results?.map((movie) => (
            <>
              <li className="flex list-disc gap-2">
                <p className="underline decoration-orange decoration-2">
                  {movie.title}
                </p>
                <span>{movie.year ? `(${movie.year})` : ""}</span>
                <span>
                  <i>{movie.director ? `directed by ${movie.director}` : ""}</i>
                </span>
              </li>
            </>
          ))}
        </ul>
      </div>
    </>
  );
};

Search.getLayout = function getLayout(page: ReactElement) {
  return <Base title="Search">{page}</Base>;
};

export default Search;
