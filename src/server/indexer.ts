import { Document } from "flexsearch";
import * as fs from "fs";
import * as path from "path";
import index from "../../public/index.json";
import type { Row } from "~/components/Archiver/types";
import type { SearchResult } from "~/components/Search/types";

const publicPath = path.join(process.cwd(), "public");

export const indexer = (() => {
  const document = new Document<SearchResult, string[]>({
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

  for (let idx = 0; idx < index?.length; idx++) {
    document.add(index[idx] as SearchResult);
  }

  function findIndicesToAdd(rows: Row[]): SearchResult[] {
    const indicesToAdd: SearchResult[] = [];

    if (!rows.length) {
      return indicesToAdd;
    }

    const movies = rows.map((row) => {
      return { title: row.title, year: row.year };
    });
    const directors = rows.map((row) => row.director);

    for (const movie of movies) {
      const results = document.search(movie.title!);
      // If the search ends up empty then we need to update the search index with this movie
      if (results?.length === 0) {
        indicesToAdd.push({
          group: "movie",
          index: movie.title!,
          year: movie.year,
        });
      }
    }

    for (const director of directors) {
      const results = document.search(director!);
      if (results?.length === 0) {
        indicesToAdd.push({
          group: "director",
          index: director!,
        });
      }
    }

    return indicesToAdd;
  }

  function writeToIndex(indicesToAdd: SearchResult[]) {
    let currentId = index[index.length - 1]?.id!;

    indicesToAdd.forEach((result) => {
      // @ts-ignore
      index.push({ ...result, id: currentId });
      currentId++;
    });

    console.log(indicesToAdd);

    fs.writeFileSync(`${publicPath}/index.json`, JSON.stringify(index));
  }

  return { findIndicesToAdd, writeToIndex };
})();
