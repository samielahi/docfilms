import { useArchiver, useArchiverDispatch } from "../ArchiverContext";
import NextButton from "../NextButton";
import Cell from "./Cell";
import Warning from "../Warning";
import { useImmer } from "use-immer";
import { columnSchemas } from "../types";
import type { ParsedRowErrors, Row } from "../types";
import type { DocMovie } from "~/types";

type Props = {
  errorId: number;
  movie: DocMovie;
  rowError: ParsedRowErrors;
};

const columns = ["title", "year", "series", "date", "director"];

export default function RowEditor(props: Props) {
  const { errorId, rowError, movie } = props;
  const columnsWithErrors = new Set(Object.keys(rowError.errors));
  const dispatch = useArchiverDispatch()!;

  const [row, setRow] = useImmer<Row>({
    title: movie.title!,
    year: movie.year!,
    director: movie.director!,
    series: movie.series!,
    date: movie.date?.toISOString().split("T")[0]!,
  });

  function confirmChange() {}

  return (
    <div className="flow mt-6 overflow-auto border-[1px] border-gray/20 p-10 md:mt-10">
      <h3 className="font-bold">Row {rowError.rowId + 1}</h3>
      {Object.values(rowError.errors).map((message, i) => (
        <Warning message={message} key={i} />
      ))}
      <div className="flex w-full flex-col gap-2 md:flex-row">
        {columns.map((col, i) => (
          <Cell
            key={i}
            editable={columnsWithErrors.has(col)}
            type={col as keyof Row}
            value={row[col as keyof Row]!}
            setValue={setRow}
          />
        ))}
      </div>
    </div>
  );
}
