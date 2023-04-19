import { csv } from "~/components/Archiver/csv";

describe("csv parsing utility", () => {
  it("Basic parsing", () => {
    const input = `title,year,director,series,date
    Pulp Fiction,1994,Quentin Tarantino,Neo Noir,2001-01-23\n`;
    const expected = [
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
    ];

    expect(csv.parse(input)).toStrictEqual(expected);
  });

  it("Parsing row with title error", () => {
    const input = `title,year,director,series,date
    ,1994,Quentin Tarantino,Neo Noir,2001-01-23\n`;
    const expected = [
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
    ];
    expect(csv.parse(input)).toStrictEqual(expected);
  });

  it("Parsing only headers", () => {
    const input = `title,year,director,series,date`;
    const expected = [[], []];
    expect(csv.parse(input)).toStrictEqual(expected);
  });

  it("Throws error if duplicate header", () => {
    const input = `title,year,title,series,date
    Pulp Fiction,1994,Quentin Tarantino,Neo Noir,2001-01-23\n`;
    const expected = new Error("Duplicate column names found.");
    expect(() => {
      csv.parse(input);
    }).toThrow(expected);
  });

  it("Throws error on empty input", () => {
    const input = ``;
    const expected = new Error("Provided csv file is empty.");
    expect(() => {
      csv.parse(input);
    }).toThrow(expected);
  });

  it("Throws error if missing column", () => {
    const input = `title,series,date,director
    Pulp Fiction,1994,Quentin Tarantino,Neo Noir,2001-01-23\n`;
    const expected = new Error("Missing required column: 'year'");
    expect(() => {
      csv.parse(input);
    }).toThrow(expected);
  });
});
