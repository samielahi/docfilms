import z from "zod";
import { enumerate } from "~/utils";
import { Result } from "true-myth";
import { columnSchemas } from "./types";
import type { DocMovie } from "~/types";
import type { ParsedRow, ParsedRowErrors, CSVParsingError } from "./types";

export const csv = (() => {
  const requiredColumns = ["title", "director", "series", "date", "year"];

  function getValidatedColumnHeaders(
    headers: string[]
  ): Result<string[], CSVParsingError> {
    // Trim whitespace and lowercase the headers
    const cleanedHeaders = headers.map((header) => header.trim().toLowerCase());
    const cleanedHeadersSet = new Set(cleanedHeaders);
    const hasDuplicateHeaders =
      Array.from(cleanedHeadersSet).length !== cleanedHeaders.length;

    if (hasDuplicateHeaders) {
      return Result.err({
        code: "duplicate_header",
        message:
          "Duplicate column headers found, please provide a .csv file with only one of each required column header",
      });
    }

    for (const header of requiredColumns) {
      if (!cleanedHeadersSet.has(header)) {
        return Result.err({
          code: "missing_required_col",
          message: `File missing required column: '${header}', try again.`,
        });
      }
    }

    return Result.ok(cleanedHeaders);
  }

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

  function parse(
    rawString: string
  ): Result<[DocMovie[], ParsedRowErrors[]], CSVParsingError> {
    if (!rawString) {
      return Result.err({
        code: "no_input",
        message: "Upload a csv to get started",
      });
    }

    if (rawString.length === 0) {
      return Result.err({
        code: "empty_csv",
        message: "Provided .csv file was empty, try again.",
      });
    }

    const rawParseResult = rawParse(rawString);

    const columnHeadersParseResult = getValidatedColumnHeaders(
      (rawParseResult as Generator).next().value as string[]
    );

    if (columnHeadersParseResult.isErr) {
      return Result.err(columnHeadersParseResult.error);
    }

    const columnHeaders = columnHeadersParseResult.value;
    const rows: DocMovie[] = [];
    const rowsWithIssues: ParsedRowErrors[] = [];

    for (const [i, row] of enumerate<ParsedRow>(rawParseResult)) {
      const movie: DocMovie = {
        title: "",
        director: "",
        series: "",
        year: 0,
        date: null,
      };
      const rowError: ParsedRowErrors = {
        rowId: i as number,
        errors: {},
      };
      for (let j = 0; j < columnHeaders.length; j++) {
        const currentField = (row as ParsedRow)[j]?.trim().toLowerCase();
        switch (columnHeaders[j]) {
          case "title":
            const title = columnSchemas.title.safeParse(currentField);
            if (title.success) {
              movie["title"] = title.data;
            } else {
              rowError["errors"]["title"] = title.error.issues[0]?.message;
            }
            break;
          case "series":
            const series = columnSchemas.series.safeParse(currentField);
            if (series.success) {
              movie["series"] = series.data;
            } else {
              rowError["errors"]["series"] = series.error.issues[0]?.message;
            }
            break;
          case "director":
            const director = columnSchemas.director.safeParse(currentField);
            if (director.success) {
              movie["director"] = director.data;
            } else {
              rowError["errors"]["director"] =
                director.error.issues[0]?.message;
            }
            break;
          case "year":
            const year = columnSchemas.year.safeParse(parseInt(currentField!));
            if (year.success) {
              movie["year"] = year.data;
            } else {
              rowError["errors"]["year"] = year.error.issues[0]?.message;
            }
            break;
          case "date":
            const date = columnSchemas.date.safeParse(currentField);
            if (date.success) {
              movie["date"] = date.data;
            } else {
              rowError["errors"]["date"] = date.error.issues[0]?.message;
            }
            break;
          default:
            break;
        }
      }

      if (Object.keys(rowError.errors).length) {
        rowsWithIssues.push(rowError);
      }
      rows.push(movie);
    }

    return Result.ok([rows, rowsWithIssues]);
  }

  return { parse };
})();
