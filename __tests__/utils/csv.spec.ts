import { csv } from "~/components/Archiver/Sections/Upload/csv";
import type { CSVParsingError, Row } from "~/components/Archiver/types";

describe("csv parsing utility", () => {
  function compareInputOutput(
    input: string,
    expected: Row[] | CSVParsingError
  ) {
    const output = csv.parse(input);
    const unwrappedOutput = output.isOk ? output.value : output.error;
    expect(unwrappedOutput).toStrictEqual(expected);
  }

  it("Basic parsing", () => {
    const input = `title,year,director,series,date
    Pulp Fiction,1994,Quentin Tarantino,Neo Noir,2001-01-23\n`;
    const expected: Row[] = [
      {
        title: "pulp fiction",
        year: 1994,
        director: "quentin tarantino",
        series: "neo noir",
        date: new Date("2001-01-23"),
        errors: {},
      },
    ];

    compareInputOutput(input, expected);
  });

  it("Parsing row with title error", () => {
    const input = `title,year,director,series,date
    ,1994,Quentin Tarantino,Neo Noir,2001-01-23\n`;
    const expected: Row[] = [
      {
        title: "",
        year: 1994,
        director: "quentin tarantino",
        series: "neo noir",
        date: new Date("2001-01-23"),
        errors: { title: "Cannot be empty" },
      },
    ];

    compareInputOutput(input, expected);
  });

  it("Parsing only headers", () => {
    const input = `title,year,director,series,date`;
    const expected: Row[] = [];
    compareInputOutput(input, expected);
  });

  it("Throws error if duplicate header", () => {
    const input = `title,year,title,series,date
    Pulp Fiction,1994,Quentin Tarantino,Neo Noir,2001-01-23\n`;
    const expected: CSVParsingError = {
      code: "duplicate_column",
      message:
        "Duplicate 'title' column found, please provide a csv with only one of each required column.",
    };
    compareInputOutput(input, expected);
  });

  it("Throws error on no input", () => {
    const input = "";
    const expected: CSVParsingError = {
      code: "no_input",
      message: "Upload a csv to get started",
    };
    compareInputOutput(input, expected);
  });

  it("Throws error if missing column", () => {
    const input = `title,series,date,director
    Pulp Fiction,1994,Quentin Tarantino,Neo Noir,2001-01-23\n`;
    const expected: CSVParsingError = {
      code: "missing_required_col",
      message: "File missing required column: 'year', try again.",
    };
    compareInputOutput(input, expected);
  });
});
