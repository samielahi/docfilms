import { useImmer } from "use-immer";
import { useArchiver, useArchiverDispatch } from "../ArchiverContext";
import { columnSchemas } from "../types";
import type { ChangeEvent } from "react";
import type { Row, Column } from "../types";

export default function useRowEditor(rowId: number, rowWithError: Row) {
  const { rows } = useArchiver()!;
  const dispatch = useArchiverDispatch()!;

  const [draftRow, setDraftRow] = useImmer<Row>({
    title: rowWithError.title!,
    year: rowWithError.year!,
    director: rowWithError.director!,
    series: rowWithError.series!,
    date: rowWithError.date,
    errors: rowWithError.errors,
  });

  function handleRowChange(e: ChangeEvent, type: Column) {
    let value: string | number | Date = (e.target as HTMLInputElement).value;

    if (type === "year") {
      value = parseInt(value);
    }

    if (type === "date") {
      value = new Date(value);
    }

    setDraftRow((draft) => {
      // @ts-ignore
      draft[type] = value;
    });

    const validatedValue = columnSchemas[type]?.safeParse(value);

    if (validatedValue?.success) {
      setDraftRow((draft) => {
        delete draft.errors![type];
      });
    } else {
      setDraftRow((draft) => {
        draft.errors![type] = validatedValue?.error.issues[0]?.message;
      });
    }
  }

  function confirmRowChanges() {
    const newRows = rows.map((row, i) => {
      if (i === rowId) {
        return draftRow;
      } else {
        return row;
      }
    });

    dispatch({
      type: "SET_ROWS",
      value: newRows,
    });
  }

  return [draftRow, handleRowChange, confirmRowChanges];
}
