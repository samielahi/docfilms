import z from "zod";
import type { DocMovie } from "~/types";

const titleSchema = z.string().min(1, { message: "'title' cannot be empty" });
const directorSchema = z
  .string()
  .min(1, { message: "'director' cannot be empty" });
const seriesSchema = z.string().min(1, { message: "'series' cannot be empty" });
const yearSchema = z.number().lte(new Date().getFullYear()).gte(1895);
const dateSchema = z.coerce
  .date()
  .min(new Date("1931-01-01"), {
    message: "Date is before the existence of docfilms",
  })
  .max(new Date(), {
    message: "Please only archive movies after their showdate.",
  });

export const columnSchemas = {
  title: titleSchema,
  director: directorSchema,
  year: yearSchema,
  series: seriesSchema,
  date: dateSchema,
};

export type ParsedRow = string[];
export type ParsedRowErrors = {
  rowId: number;
  errors: Partial<Record<keyof DocMovie, string>>;
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
