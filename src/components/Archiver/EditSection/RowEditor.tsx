import { useArchiver, useArchiverDispatch } from "../ArchiverContext";
import NextButton from "../NextButton";
import EditableCell from "./EditableCell";
import Cell from "./Cell";
import Warning from "../Warning";
import { useImmer } from "use-immer";
import { columnSchemas } from "../types";
import type { Row, Column } from "../types";

type Props = {
  rowWithError: Row;
  id: number;
};

const columns: Column[] = ["title", "year", "series", "date", "director"];

export default function RowEditor(props: Props) {
  const { rowWithError, id } = props;
  const columnsWithErrors = new Set(Object.keys(rowWithError.errors!));
  const dispatch = useArchiverDispatch()!;

  const [row, setRow] = useImmer<Row>({
    title: rowWithError.title!,
    year: rowWithError.year!,
    director: rowWithError.director!,
    series: rowWithError.series!,
    date: rowWithError.date,
  });

  return (
    <div className="flow mt-6 overflow-auto border-[1px] border-gray/20 p-10 md:mt-10">
      <h3 className="font-bold">Row {id + 1}</h3>
      {Object.values(rowWithError.errors!).map((message, i) => (
        <Warning message={message} key={i} />
      ))}
      <div className="flex w-full flex-col gap-2 md:flex-row">
        {columns.map((col, i) =>
          columnsWithErrors.has(col) ? (
            <EditableCell
              key={i}
              type={col}
              value={row[col]!}
              setValue={setRow}
            />
          ) : (
            <Cell key={i} type={col} value={row[col]!} />
          )
        )}
      </div>
    </div>
  );
}
