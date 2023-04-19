import type { ZodError } from "zod";
import type { DocMovie } from "~/types";

// export type ArchivableDocMovie = Required<
//   Pick<DocMovie, "title" | "year" | "director" | "series" | "date">
// > &
//   Pick<
//     DocMovie,
//     "backdrop_path" | "overview" | "quarter" | "times_shown" | "tmdbID"
//   >;

export type ParsedRow = string[];
export type ParseErrors = Partial<Record<keyof DocMovie, string>>;
export type ParsedRowWithErrors = {
  id: number;
  errors: ParseErrors;
};

export enum Stage {
  upload,
  edit,
  index,
  merge,
  review,
}

export interface ArchiveSession {
  data: DocMovie[];
  currentStage: Stage;
}
