import EditableCell from "./EditableCell";
import Cell from "./Cell";
import Error from "../Error";
import { useMemo } from "react";
import useRowEditor from "./useRowEditor";
import type { Row, Column } from "../../types";
import type { ChangeEvent } from "react";

type Props = {
  rowWithError: Row;
  rowId: number;
};

export default function RowEditor({ rowWithError, rowId }: Props) {
  const [draftRow, handleRowChange, confirmRowChanges] = useRowEditor(
    rowId,
    rowWithError
  );

  const columnsWithErrors = useMemo(() => {
    return new Set<Column>(Object.keys(rowWithError.errors!) as Column[]);
  }, [rowWithError]);

  return (
    <div className="flow mt-6 overflow-auto border-[1px] border-gray/20 p-10 md:mt-10">
      <h3 className="font-bold">Row {rowId + 1}</h3>

      <Errors draftRow={draftRow as Row} />

      <EditableRow
        draftRow={draftRow as Row}
        columnsWithErrors={columnsWithErrors}
        handleRowChange={
          handleRowChange as (e: ChangeEvent, type: Column) => void
        }
      />

      <ConfirmChanges
        draftRow={draftRow as Row}
        confirmRowChanges={confirmRowChanges as () => void}
      />
    </div>
  );
}

function Errors({ draftRow }: { draftRow: Row }) {
  return (
    <>
      {Object.entries(draftRow.errors!).map(([column, message], i) => (
        <Error message={`Column '${column}': ` + message} key={i} />
      ))}
    </>
  );
}

function EditableRow({
  draftRow,
  columnsWithErrors,
  handleRowChange,
}: {
  draftRow: Row;
  columnsWithErrors: Set<Column>;
  handleRowChange: (e: ChangeEvent, type: Column) => void;
}) {
  const columns: Column[] = ["title", "year", "series", "date", "director"];

  return (
    <div className="flex w-full flex-col gap-2 md:flex-row">
      {columns.map((col, i) =>
        columnsWithErrors.has(col) ? (
          <EditableCell
            key={i}
            type={col}
            value={draftRow[col]!}
            handleChange={
              handleRowChange as (e: ChangeEvent, type: Column) => void
            }
          />
        ) : (
          <Cell key={i} type={col} value={draftRow[col]!} />
        )
      )}
    </div>
  );
}

function ConfirmChanges({
  draftRow,
  confirmRowChanges,
}: {
  draftRow: Row;
  confirmRowChanges: () => void;
}) {
  const rowHasErrors = useMemo(() => {
    return Object.keys(draftRow.errors!).length > 0;
  }, [draftRow]);

  return (
    <div
      className={`${!rowHasErrors ? "flex" : "hidden"} w-full justify-end`}
      aria-hidden={!rowHasErrors}
    >
      <button
        className="border-[1px] border-gray/20 px-4 py-2 font-bold transition-colors duration-300 hover:bg-white hover:text-black"
        onClick={confirmRowChanges as () => void}
      >
        confirm
      </button>
    </div>
  );
}
