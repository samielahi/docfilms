import { useArchiver, useArchiverDispatch } from "../ArchiverContext";
import { csv } from "../csv";

export default function ParseCSV() {
  const { csvString } = useArchiver()!;
  const dispatch = useArchiverDispatch()!;
  const parsedCSV = csv.parse(csvString!);

  if (parsedCSV.isErr && parsedCSV.error.code === "no_input") {
    return <>{parsedCSV.error.message}</>;
  }

  if (parsedCSV.isErr && parsedCSV.error.code === "empty_csv") {
    return <>{parsedCSV.error.message}</>;
  }

  if (parsedCSV.isErr && parsedCSV.error.code === "duplicate_header") {
    return <>{parsedCSV.error.message}</>;
  }

  if (parsedCSV.isErr && parsedCSV.error.code === "missing_required_col") {
    return <>{parsedCSV.error.message}</>;
  }

  if (parsedCSV.isOk) {
    const [rows, issues] = parsedCSV.value;

    function advance() {
      dispatch({
        type: "SET_DATA",
        value: rows,
      });

      dispatch({
        type: "SET_ISSUES",
        value: issues,
      });

      dispatch({
        type: "ADVANCE_STAGE",
      });
    }

    return (
      <>
        <p>Successfully loaded {rows.length} row(s)</p>
        <button
          onClick={advance}
          className="arrow-button pointer-events-auto relative inline-block px-8 py-4 font-bold"
        >
          <span className="arrow-button-text">Next</span>
        </button>
      </>
    );
  }

  return <></>;
}
