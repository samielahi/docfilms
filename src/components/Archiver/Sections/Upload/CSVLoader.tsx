import Button from "~/components/Button";
import Icon from "~/components/Icon";
import Error from "../Error";
import { fileOpen } from "browser-fs-access";
import { blobToString } from "~/utils";
import { csv } from "./csv";
import { useMemo, useEffect, useCallback } from "react";
import { useArchiver, useArchiverDispatch } from "../../ArchiverContext";
import type { Dispatch } from "react";
import type { Result } from "true-myth";
import type { Row, CSVParsingError, ArchiverAction } from "../../types";

export default function CSVLoader() {
  const { csvString } = useArchiver()!;
  const dispatch = useArchiverDispatch()!;

  const parsedCSV = useMemo(() => {
    return csv.parse(csvString!);
  }, [csvString]);

  async function loadCSV() {
    const csvFile = await fileOpen({
      extensions: [".csv"],
    });

    const csvFileString = await blobToString(csvFile);

    dispatch({
      type: "LOAD_CSV",
      value: csvFileString,
    });
  }

  return (
    <>
      <Button onClick={loadCSV}>
        <span>upload</span>
      </Button>
      <Uploader parsedCSV={parsedCSV} dispatch={dispatch} />
    </>
  );
}

type Props = {
  parsedCSV: Result<Row[], CSVParsingError>;
  dispatch: Dispatch<ArchiverAction>;
};

function Uploader({ parsedCSV, dispatch }: Props) {
  useEffect(() => {
    if (parsedCSV.isOk) {
      dispatch({
        type: "SET_ROWS",
        value: parsedCSV.value,
      });
    }
  }, [parsedCSV, dispatch]);

  if (parsedCSV.isErr && parsedCSV.error.message) {
    return <Error message={parsedCSV.error.message} />;
  }

  if (parsedCSV.isOk) {
    const rows = parsedCSV.value;

    return (
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center sm:gap-0">
        <div className="flex gap-4">
          <Icon name="confirm" />

          <p>
            Successfully loaded {rows.length}{" "}
            {rows.length === 1 ? "row" : "rows"}. Click next to continue.
          </p>
        </div>
      </div>
    );
  }

  return <></>;
}
