import Link from "next/link";
import Base from "~/layouts/Base";
import Image from "next/image";
import { useRouter } from "next/router";
import useFlexSearch from "~/hooks/useFlexSearch";
import { getResultIcon } from "~/components/Search/SearchResultItem";
import type { ResultGroup, SearchResult } from "~/components/Search/types";
import type { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";

const Search: NextPageWithLayout = () => {
  const router = useRouter();
  const query = router.query.q! as string;
  const { results, isError } = useFlexSearch(query, 15);

  if (isError) return <div>An error occurred while fetching results.</div>;
  const numResults = results?.length;
  // Split up results by group
  const movies = results?.filter(
    (result: SearchResult) => result.group === "movie"
  );
  const directors = results?.filter(
    (result: SearchResult) => result.group === "director"
  );
  const quarters = results?.filter(
    (result: SearchResult) => result.group === "quarter"
  );

  return (
    <>
      <div className="flow mt-[calc(100px_+_3rem)]">
        <h2 className="w-fit font-bold text-white">
          Search Results for : <i className="text-orange">{query}</i>
        </h2>
        <p role="status" className="italic">
          Found {numResults} {numResults === 1 ? "match" : "matches"}
        </p>

        <div className="flow pl-6">
          {results &&
            results.map((result: SearchResult, i) => (
              <PageResult
                key={i}
                index={result.index}
                group={result.group}
                year={result.year}
              />
            ))}
        </div>
      </div>
    </>
  );
};

function PageResult(props: Partial<SearchResult>) {
  return (
    <>
      <Link
        className="flex w-fit gap-4 underline decoration-white underline-offset-4"
        href={
          props.group === "movie"
            ? `/${props.group}/${props.index!}?year=${props.year!}`
            : `/${props.group!}/${props.index!}`
        }
      >
        <Image
          src={getResultIcon(props.group!)}
          alt=""
          role="presentation"
          width={30}
          height={30}
        />
        <li className="list-none italic md:text-xl">
          {props.index} {props.year && <span> ({props.year})</span>}
        </li>
      </Link>
    </>
  );
}

Search.getLayout = function getLayout(page: ReactElement) {
  return <Base title="Search">{page}</Base>;
};

export default Search;
