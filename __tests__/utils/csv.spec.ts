import { csv } from "~/components/Archiver/csv";
import { Result } from "true-myth";
``;

describe("csv parsing utility", () => {
  it("Basic parsing", () => {
    const input = `title,year,director,series,date
    Pulp Fiction,1994,Quentin Tarantino,Neo Noir,2001-01-23\n`;
    const expected = Result.ok([
      [
        {
          title: "Pulp Fiction",
          year: 1994,
          director: "Quentin Tarantino",
          series: "Neo Noir",
          date: new Date("2001-01-23"),
        },
      ],
      [],
    ]);

    expect(csv.parse(input)).toStrictEqual(expected);
  });

  it("Parsing row with title error", () => {
    const input = `title,year,director,series,date
    ,1994,Quentin Tarantino,Neo Noir,2001-01-23\n`;
    const expected = Result.ok([
      [
        {
          title: "",
          year: 1994,
          director: "Quentin Tarantino",
          series: "Neo Noir",
          date: new Date("2001-01-23"),
        },
      ],
      [{ id: 0, errors: { title: "'title' cannot be empty" } }],
    ]);
    expect(csv.parse(input)).toStrictEqual(expected);
  });

  it("Parsing only headers", () => {
    const input = `title,year,director,series,date`;
    const expected = Result.ok([[], []]);
    expect(csv.parse(input)).toStrictEqual(expected);
  });

  it("Throws error if duplicate header", () => {
    const input = `title,year,title,series,date
    Pulp Fiction,1994,Quentin Tarantino,Neo Noir,2001-01-23\n`;
    const expected = Result.err({
      code: "duplicate_header",
      message:
        "Duplicate column headers found, please provide a .csv file with only one of each required column header",
    });
    expect(csv.parse(input)).toStrictEqual(expected);
  });

  it("Throws error on empty input", () => {
    const input = ``;
    const expected = Result.err({
      code: "empty_csv",
      message: "Provided .csv file was empty",
    });
    expect(csv.parse(input)).toStrictEqual(expected);
  });

  it("Throws error if missing column", () => {
    const input = `title,series,date,director
    Pulp Fiction,1994,Quentin Tarantino,Neo Noir,2001-01-23\n`;
    const expected = Result.err({
      code: "missing_required_col",
      message: "Missing required column: 'year'",
    });
    expect(csv.parse(input)).toStrictEqual(expected);
  });
});
