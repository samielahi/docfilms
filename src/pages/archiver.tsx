import Base from "~/layouts/Base";
import { useState } from "react";
import { blobToString } from "~/utils";
import type { ChangeEvent, ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";

const Archiver: NextPageWithLayout = () => {
  const [file, setFile] = useState<Blob | File | null>(null);

  function uploadCSV(e: ChangeEvent) {
    const target = e.target as HTMLInputElement;
    const file = target.files![0];
    if (file) {
      setFile(file);
    }
  }

  async function parseCSV(file: Blob | File) {
    const csvText = await blobToString(file);
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <label htmlFor="csvUpload">Upload csv</label>
        <input
          type="file"
          name="csvUpload"
          id="csvUpload"
          accept=".csv"
          onChange={uploadCSV}
        />
      </div>
    </>
  );
};

Archiver.getLayout = function getLayout(page: ReactElement) {
  return <Base title="Archiver">{page}</Base>;
};

export default Archiver;
