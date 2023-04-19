import z from "zod";
import { enumerate } from "~/utils";
import type { DocMovie } from "~/types";
import type { ParsedRow, ParsedRowWithErrors, ParseErrors } from "./types";

/*
  TODO:
  - model errors
*/

export const csv = (() => {
  const titleSchema = z.string().min(1, { message: "'title' cannot be empty" });
  const directorSchema = z
    .string()
    .min(1, { message: "'director' cannot be empty" });
  const seriesSchema = z
    .string()
    .min(1, { message: "'series' cannot be empty" });
  const yearSchema = z.number().lte(new Date().getFullYear()).gte(1895);
  const dateSchema = z.coerce
    .date()
    .min(new Date("1931-01-01"), {
      message: "Date is before the existence of docfilms",
    })
    .max(new Date(), {
      message: "Please only archive movies past their showdate.",
    });

  const requiredColumns = ["title", "director", "series", "date", "year"];

  function getValidatedColumnHeaders(headers: string[]) {
    // Trim whitespace and lowercase the headers
    const cleanedHeaders = headers.map((header) => header.trim().toLowerCase());
    const cleanedHeadersSet = new Set(cleanedHeaders);
    const hasDuplicateHeaders =
      Array.from(cleanedHeadersSet).length !== cleanedHeaders.length;

    if (hasDuplicateHeaders) {
      throw new Error(`Duplicate column names found.`);
    }

    for (const header of requiredColumns) {
      if (!cleanedHeadersSet.has(header)) {
        throw new Error(`Missing required column: '${header}'`);
      }
    }
    return cleanedHeaders;
  }

  // Parses raw string into an array of strings that are separated by commas and separates those by CR/LF
  function* rawParse(rawString: string): Generator<ParsedRow, void, undefined> {
    if (rawString.length === 0) {
      throw Error("Provided csv file is empty.");
    }

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

  function parse(rawString: string) {
    const rawParsedRows = rawParse(rawString);
    const rows: DocMovie[] = [];
    const rowsWithIssues: ParsedRowWithErrors[] = [];
    const columnHeaders = getValidatedColumnHeaders(
      rawParsedRows.next().value as string[]
    );

    for (const [i, row] of enumerate<ParsedRow>(rawParsedRows)) {
      const movie: DocMovie = {
        title: "",
        director: "",
        series: "",
        year: 0,
        date: null,
      };
      const errors: ParseErrors = {};
      for (let j = 0; j < columnHeaders.length; j++) {
        const currentField = (row as ParsedRow)[j]?.trim();
        switch (columnHeaders[j]) {
          case "title":
            const title = titleSchema.safeParse(currentField);
            if (title.success) {
              movie["title"] = title.data;
            } else {
              errors["title"] = title.error.issues[0]?.message;
            }
            break;
          case "series":
            const series = seriesSchema.safeParse(currentField);
            if (series.success) {
              movie["series"] = series.data;
            } else {
              errors["series"] = series.error.issues[0]?.message;
            }
            break;
          case "director":
            const director = directorSchema.safeParse(currentField);
            if (director.success) {
              movie["director"] = director.data;
            } else {
              errors["director"] = director.error.issues[0]?.message;
            }
            break;
          case "year":
            const year = yearSchema.safeParse(parseInt(currentField!));
            if (year.success) {
              movie["year"] = year.data;
            } else {
              errors["year"] = year.error.message;
            }
            break;
          case "date":
            const date = dateSchema.safeParse(currentField);
            if (date.success) {
              movie["date"] = date.data;
            } else {
              errors["date"] = date.error.issues[0]?.message;
            }
            break;
          default:
            break;
        }
      }

      if (Object.keys(errors).length) {
        rowsWithIssues.push({ id: i as number, errors: errors });
      }
      rows.push(movie);
    }

    return [rows, rowsWithIssues];
  }

  return { parse };
})();
