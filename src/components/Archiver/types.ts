import type { FileWithHandle } from "browser-fs-access";
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
  enrich,
  review,
}

export namespace Stage {
  export function next(value: Stage): Stage {
    return value + 1;
  }
}

export interface ArchiverSession {
  csvString?: string;
  data?: DocMovie[];
  errors?: ParsedRowErrors[];
  currentStage?: Stage;
}

export type ArchiverAction =
  | { type: "LOAD_CSV"; value: string }
  | { type: "PARSE_CSV" }
  | { type: "CREATE_INDEX" }
  | { type: "ADVANCE_STAGE" };
