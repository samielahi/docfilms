import z from "zod";

const Title = z.string().min(1, { message: "Cannot be empty" });
const Director = z.string().min(1, { message: "Cannot be empty" });
const Series = z.string().min(1, { message: "Cannot be empty" });
const Year = z.number().lte(new Date().getFullYear()).gte(1895);
const DateShown = z.coerce
  .date()
  .min(new Date("1931-01-01"), {
    message: "Show date cannot be before the existence of docfilms",
  })
  .max(new Date(), {
    message: "Show date cannot be in the future",
  });

export const columnSchemas: Record<
  string,
  z.ZodString | z.ZodNumber | z.ZodDate
> = {
  title: Title,
  director: Director,
  year: Year,
  series: Series,
  date: DateShown,
};

type Title = z.infer<typeof Title>;
type Director = z.infer<typeof Director>;
type Series = z.infer<typeof Series>;
type Year = z.infer<typeof Year>;
type DateShown = z.infer<typeof DateShown>;

export interface Row {
  title?: Title;
  year?: Year;
  date?: DateShown | string;
  series?: Series;
  director?: Director;
  errors?: Partial<Record<Column, string>>;
}
export type Column = "title" | "year" | "director" | "date" | "series";

export type ParsedRow = string[];

// CSV Parsing Errors
type DuplicateColumn = {
  code: "duplicate_column";
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
  | DuplicateColumn
  | MissingRequiredColumn
  | EmptyInput
  | NoInput;

// Archiver section
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

// Archiver Context
export interface ArchiverSession {
  csvString?: string;
  rows: Row[];
  currentSection?: Section;
}

export type ArchiverAction =
  | { type: "LOAD_CSV"; value: string }
  | { type: "SET_ROWS"; value: Row[] }
  | { type: "CREATE_INDEX" }
  | { type: "ADVANCE" };
