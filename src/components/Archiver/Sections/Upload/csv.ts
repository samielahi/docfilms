import { createFrequencyMap } from "~/utils";
import { columnSchemas } from "../../types";
import { Result } from "true-myth";
import type { ParsedRow, Row, Column, CSVParsingError } from "../../types";

export const csv = (() => {
  function* rawParse(rawString: string): Generator<ParsedRow, void, undefined> {
    let currentRow: string[] = [];
    let insideQuotedField = false;
    for (let currentColumn = 0, idx = 0; idx < rawString.length; idx++) {
      const currentCharacter = rawString[idx];
      const nextCharacter = rawString[idx + 1];
      currentRow[currentColumn] = currentRow[currentColumn] || "";

      // If the current character is a quotation mark, and we're inside a
      // quoted field, and the next character is also a quotation mark,
      // add a quotation mark to the current column and skip the next character
      currentCharacter == '"' && insideQuotedField && nextCharacter == '"'
        ? ((currentRow[currentColumn] += currentCharacter), ++idx)
        : // If it's just one quotation mark, begin/end quoted field
        currentCharacter == '"'
        ? (insideQuotedField = !insideQuotedField)
        : // If it's a comma and we're not in a quoted field, move on to the next column
        currentCharacter == "," && !insideQuotedField
        ? ++currentColumn
        : // If it's a newline (CRLF) and we're not in a quoted field, skip the next character
        // and move on to the next row and move to column 0 of that new row
        currentCharacter == "\r" && nextCharacter == "\n" && !insideQuotedField
        ? (yield currentRow, (currentColumn = 0), (currentRow = []), ++idx)
        : // If it's a newline (LF or CR) and we're not in a quoted field,
        // move on to the next row and move to column 0 of that new row
        (currentCharacter == "\n" || currentCharacter == "\r") &&
          !insideQuotedField
        ? (yield currentRow, (currentColumn = 0), (currentRow = []))
        : // Otherwise, append the current character to the current column
          (currentRow[currentColumn] += currentCharacter);
    }
    currentRow.length && (yield currentRow);
  }

  const requiredColumns = new Set<Column>([
    "title",
    "date",
    "director",
    "series",
    "year",
  ]);

  function cleanColumns(values: ParsedRow): ParsedRow {
    return values.map((value) => value.trim().toLowerCase());
  }

  function validateColumns(
    values: ParsedRow
  ): Result<ParsedRow, CSVParsingError> {
    const cleanedValues = cleanColumns(values);
    const valueFrequencyMap = createFrequencyMap<string>(cleanedValues);

    for (const column of requiredColumns) {
      const count = valueFrequencyMap.get(column);
      // If the count doesn't exist then report that the column is missing
      if (!count) {
        return Result.err({
          code: "missing_required_col",
          message: `File missing required column: '${column}', try again.`,
        });
      }

      // If the column exists (because it has a count), but it's > 1 then report it as a duplicate
      if (count > 1) {
        return Result.err({
          code: "duplicate_column",
          message: `Duplicate '${column}' column found, please provide a csv with only one of each required column.`,
        });
      }
    }

    return Result.ok(cleanedValues);
  }

  function parse(rawString: string): Result<Row[], CSVParsingError> {
    // For undefined or null input, report no_input error
    if (!rawString) {
      return Result.err({
        code: "no_input",
        message: "Upload a csv to get started",
      });
    }

    // If the string is empty, report empty_csv error
    if (rawString.length === 0) {
      return Result.err({
        code: "empty_csv",
        message: "Provided .csv file was empty, try again.",
      });
    }

    const rawParsedCSV = rawParse(rawString);

    // First yield from rawParsedCSV Generator should be row of column headers
    const columns = validateColumns(
      (rawParsedCSV as Generator).next().value as ParsedRow
    );

    // Report any issues with validating columns
    if (columns.isErr) {
      return Result.err(columns.error);
    }

    const validatedColumns = columns.value;
    const rows: Row[] = [];

    for (const parsedRow of rawParsedCSV) {
      const row: Row = {
        title: "",
        director: "",
        series: "",
        year: 0,
        date: undefined,
        errors: {},
      };

      for (let idx = 0; idx < validatedColumns.length; idx++) {
        const currentField = parsedRow[idx]?.trim().toLowerCase();
        // REFACTOR
        switch (validatedColumns[idx]) {
          case "title":
            const title = columnSchemas.title!.safeParse(currentField);
            if (title.success) {
              row["title"] = title.data as string;
            } else {
              row["errors"]!["title"] = title.error.issues[0]?.message;
            }
            break;
          case "series":
            const series = columnSchemas.series!.safeParse(currentField);
            if (series.success) {
              row["series"] = series.data as string;
            } else {
              row["errors"]!["series"] = series.error.issues[0]?.message;
            }
            break;
          case "director":
            const director = columnSchemas.director!.safeParse(currentField);
            if (director.success) {
              row["director"] = director.data as string;
            } else {
              row["errors"]!["director"] = director.error.issues[0]?.message;
            }
            break;
          case "year":
            const year = columnSchemas.year!.safeParse(parseInt(currentField!));
            if (year.success) {
              row["year"] = year.data as number;
            } else {
              row["errors"]!["year"] = year.error.issues[0]?.message;
            }
            break;
          case "date":
            const date = columnSchemas.date!.safeParse(currentField);
            if (date.success) {
              row["date"] = date.data as Date;
            } else {
              row["errors"]!["date"] = date.error.issues[0]?.message;
            }
            break;
          default:
            break;
        }
      }

      rows.push(row);
    }

    return Result.ok(rows);
  }

  return { parse };
})();
