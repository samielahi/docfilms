// Hook for facilitating client side full text search
import { useMemo, useState } from "react";
import useSWRImmutable from "swr";
import { Document } from "flexsearch";

import type { Fetcher } from "swr";
import type { SearchResult } from "~/components/Search/types";

const url = "/index.json";

const fetcher: Fetcher<SearchResult[], string> = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw Error(await response.text());
  }
  // Note .json() method can throw
  return (await response.json()) as SearchResult[];
};

export default function useFlexSearch(
  query: string,
  numberOfResults: number = 10
) {
  const [shouldFetch, setShouldFetch] = useState(false);

  if (!shouldFetch && query.length) {
    setShouldFetch(true);
  }

  const { data, error } = useSWRImmutable<SearchResult[], Error>(
    shouldFetch ? url : null,
    fetcher
  );

  const document = useMemo(() => {
    const index = new Document<SearchResult, string[]>({
      tokenize: "forward",
      language: "en",
      preset: "performance",
      context: true,
      document: {
        id: "id",
        index: ["index"],
        store: ["index", "year", "group"],
      },
    });

    for (let idx = 0; idx < data?.length!; idx++) {
      index.add(data![idx]!);
    }

    return index;
  }, [data]);

  const indexResults = useMemo(
    () =>
      document.search(query, numberOfResults, {
        limit: numberOfResults,
        enrich: true,
      }),
    [query, document, numberOfResults]
  );

  // Grab only the document from the results
  const searchResults = indexResults.length
    ? indexResults[0]?.result.map((result) => result.doc)
    : [];

  return {
    results: searchResults,
    isError: error,
  };
}
