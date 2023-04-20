import Image from "next/image";
import NextButton from "../NextButton";
import { useArchiver, useArchiverDispatch } from "../ArchiverContext";
import { csv } from "../csv";

export default function UploadStatus() {
  const { csvString } = useArchiver()!;
  const dispatch = useArchiverDispatch()!;
  const parsedCSV = csv.parse(csvString!);

  if (parsedCSV.isErr && parsedCSV.error.message) {
    return <Warning message={parsedCSV.error.message} />;
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
        type: "ADVANCE",
      });
    }

    return (
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <Image
            src="/check-circle-2.svg"
            width={25}
            height={25}
            alt=""
            role="presentation"
          />
          <p>
            Successfully loaded {rows.length}{" "}
            {rows.length === 1 ? "row" : "rows"}
          </p>
        </div>
        <NextButton onClick={advance} />
      </div>
    );
  }

  return <></>;
}

function Warning({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-4">
      <Image
        src="/alert-triangle.svg"
        width={25}
        height={25}
        alt=""
        role="presentation"
      />
      <p className="font-bold">{message}</p>
    </div>
  );
}
