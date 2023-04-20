import type { DocMovie } from "~/types";

export type ParsedRow = string[];
export type ParsedRowErrors = {
  id: number;
  errors: CSVParsingError;
};

export type InvalidColumnValue = {
  code: "invalid_col_value";
  id: number;
  issues: Partial<Record<keyof DocMovie, string>>;
  message?: string;
};

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

type NoInput = {
  code: "no_input";
  message: string;
};

export type CSVParsingError =
  | DuplicateHeader
  | MissingRequiredColumn
  | EmptyInput
  | InvalidColumnValue
  | NoInput;

export enum Section {
  upload,
  edit,
  index,
  enrich,
  review,
}

export namespace Section {
  export function next(value: Section): Section {
    return value + 1;
  }
}

export interface ArchiverSession {
  csvString?: string;
  data?: DocMovie[];
  errors?: ParsedRowErrors[];
  currentSection?: Section;
}

export type ArchiverAction =
  | { type: "LOAD_CSV"; value: string }
  | { type: "SET_DATA"; value: DocMovie[] }
  | { type: "SET_ISSUES"; value: ParsedRowErrors[] }
  | { type: "CREATE_INDEX" }
  | { type: "ADVANCE" };
