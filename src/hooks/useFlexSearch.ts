import { useMemo, useState } from "react";
import type { Fetcher } from "swr";
import useSWRImmutable from "swr";
import { Document } from "flexsearch";
import type { DocumentOptions } from "flexsearch";

export interface DocSearchIndexResult {
  id: number;
  title: string;
  year?: number;
  director?: string;
  quarter?: string;
}

const moviesIndexUrl: string = "/movies-index.json";
const moviesIndexOptions: DocumentOptions<DocSearchIndexResult, string[]> = {
  id: "id",
  index: ["title"],
  store: ["title", "director", "year"],
};
const fetcher: Fetcher<DocSearchIndexResult[], string> = async (
  url: string
) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw Error(await response.text());
  }
  // Note .json() method can throw
  return (await response.json()) as DocSearchIndexResult[];
};

export default function useFlexSearch(
  query: string,
  url: string = moviesIndexUrl,
  numberOfResults: number = 4,
  documentOptions: DocumentOptions<
    DocSearchIndexResult,
    string[]
  > = moviesIndexOptions
) {
  const [shouldFetch, setShouldFetch] = useState(false);

  if (!shouldFetch && query.length) {
    setShouldFetch(true);
  }

  const { data, error } = useSWRImmutable<DocSearchIndexResult[], Error>(
    shouldFetch ? url : null,
    fetcher
  );

  const document = useMemo(() => {
    const index = new Document<DocSearchIndexResult, string[]>({
      tokenize: "forward",
      language: "en",
      preset: "performance",
      context: true,
      document: documentOptions,
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
    [query, document]
  );

  const searchResults = indexResults.length
    ? indexResults[0]?.result.map((res) => res.doc)
    : [];

  return {
    searchResults: searchResults,
    isError: error,
  };
}
