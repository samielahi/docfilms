import type { DocMovie } from "~/types";

export type ParsedRow = string[];
export type ParsedRowErrors = {
  id: number;
  errors: CSVParsingError;
};

export type InvalidColumnValue = Partial<Record<keyof DocMovie, string>>;

type DuplicateHeader = {
  code: "duplicate_header";
  message: string;
};

type MissingRequiredColumn = {
  code: "missing_required_col";
  message: string;
};

type EmptyInput = {
  code: "empty_csv";
  message: string;
};

export type CSVParsingError =
  | DuplicateHeader
  | MissingRequiredColumn
  | EmptyInput
  | InvalidColumnValue;

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
