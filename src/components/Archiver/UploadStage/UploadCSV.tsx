import { fileOpen } from "browser-fs-access";
import { useArchiver, useArchiverDispatch } from "../ArchiverContext";
import { blobToString } from "~/utils";

export default function UploadCSV() {
  const dispatch = useArchiverDispatch()!;

  async function uploadCSV() {
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
        onClick={uploadCSV}
        className="flex flex-col gap-4 border-[1px] border-gray py-2 px-4 font-bold transition-colors hover:bg-gray hover:text-black"
      >
        Upload
      </button>
    </>
  );
}
