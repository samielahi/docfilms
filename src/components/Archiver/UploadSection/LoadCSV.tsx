import { fileOpen } from "browser-fs-access";
import { useArchiverDispatch } from "../ArchiverContext";
import { blobToString } from "~/utils";

export default function LoadCSV() {
  const dispatch = useArchiverDispatch()!;

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
      <button
        onClick={loadCSV}
        className="flex w-[125px] justify-center gap-4 border-[1px] border-gray py-2 px-4 font-bold transition-colors hover:bg-gray hover:text-black"
      >
        Upload
      </button>
    </>
  );
}
