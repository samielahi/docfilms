import { useMemo, useState } from "react";
import type { Fetcher } from "swr";
import useSWRImmutable from "swr";
import { Document } from "flexsearch";

export type ResultType = "movie" | "director" | "quarter";

export interface DocSearchIndexResult {
  id: number;
  title: string;
  type: ResultType;
  year?: number;
  director?: string;
  quarter?: string;
}

const urls = {
  movie: "/movies-index.json",
  director: "/directors-index.json",
  quarter: "/quarters-index.json",
};

const indexOptions = {
  movie: {
    id: "id",
    index: ["title"],
    store: ["title", "director", "year"],
  },
  director: {
    id: "id",
    index: ["director"],
    store: ["director"],
  },
  quarter: {
    id: "id",
    index: ["quarter"],
    store: ["quarter"],
  },
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

export default function useFlexSearch(query: string, type: ResultType) {
  const url = urls[type];
  const documentOptions = indexOptions[type];
  const numberOfResults = 4;
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
    ? indexResults[0]?.result.map(({ ...doc }) => ({ ...doc.doc, type: type }))
    : [];

  return {
    results: searchResults,
    isError: error,
  };
}
