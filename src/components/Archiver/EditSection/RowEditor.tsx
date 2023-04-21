import { useState } from "react";
import { useArchiver, useArchiverDispatch } from "../ArchiverContext";
import NextButton from "../NextButton";
import Cell from "./Cell";
import Warning from "../Warning";
import Image from "next/image";
import { columnSchemas } from "../types";
import type { ParsedRowErrors } from "../types";
import type { DocMovie } from "~/types";

type Props = {
  errorId: number;
  movie: DocMovie;
  rowError: ParsedRowErrors;
};

export default function RowEditor(props: Props) {
  const { errorId, rowError, movie } = props;
  const columnsWithErrors = new Set(Object.keys(rowError.errors));
  const dispatch = useArchiverDispatch()!;
  const [title, setTitle] = useState(movie.title);
  const [year, setYear] = useState(movie.year);
  const [director, setDirector] = useState(movie.director);
  const [series, setSeries] = useState(movie.series);
  const [date, setDate] = useState(movie.date?.toISOString().split("T")[0]);

  return (
    <div className="flow mt-6 border-[1px] border-gray/20 p-10 md:mt-10">
      <h3 className="font-bold">Row {rowError.rowId + 1}</h3>
      {Object.values(rowError.errors).map((message, i) => (
        <Warning message={message} key={i} />
      ))}
      <div className="flex items-center gap-0">
        <Cell
          editable={columnsWithErrors.has("title")}
          type="title"
          value={title!}
          setValue={setTitle}
        />
        <Cell
          editable={columnsWithErrors.has("year")}
          type="year"
          value={year!}
          setValue={setYear}
        />
        <Cell
          editable={columnsWithErrors.has("director")}
          type="director"
          value={director!}
          setValue={setDirector}
        />
        <Cell
          editable={columnsWithErrors.has("series")}
          type="series"
          value={series!}
          setValue={setSeries}
        />
        <Cell
          editable={columnsWithErrors.has("date")}
          type="date"
          value={date!}
          setValue={setDate}
        />
      </div>
    </div>
  );
}
