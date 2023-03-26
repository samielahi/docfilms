import { useMemo, useState } from "react";
import useSWR, { Fetcher } from "swr";
import { Document } from "flexsearch";

export interface DocMovieSearchIndexResult {
  id: number;
  title: string;
  year?: number;
  director?: string;
}

const url: string = "/search-index.json";
const fetcher: Fetcher<DocMovieSearchIndexResult[], string> = async (
  url: string
) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw Error(await response.text());
  }
  return (await response.json()) as DocMovieSearchIndexResult[];
};

export default function useFlexSearch(query: string) {
  const [shouldFetch, setShouldFetch] = useState(false);

  if (!shouldFetch && query.length) {
    setShouldFetch(true);
  }

  const { data, error } = useSWR<DocMovieSearchIndexResult[], Error>(
    shouldFetch ? url : null,
    fetcher
  );

  const document = useMemo(() => {
    const index = new Document<DocMovieSearchIndexResult, string[]>({
      tokenize: "full",
      language: "en",
      preset: "match",
      cache: true,
      context: true,
      document: {
        id: "id",
        index: ["title"],
        store: ["title", "director", "year"],
      },
    });

    for (let idx = 0; idx < data?.length!; idx++) {
      index.add(data![idx]!);
    }

    return index;
  }, []);

  const numberOfResults = 5;
  const indexResults = useMemo(
    () =>
      document.search(query, numberOfResults, {
        limit: numberOfResults,
        enrich: true,
      }),
    [query]
  );

  const searchResults = indexResults.length
    ? indexResults[0]?.result.map((res) => res.doc)
    : [];

  return {
    results: searchResults,
    isError: error,
  };
}
