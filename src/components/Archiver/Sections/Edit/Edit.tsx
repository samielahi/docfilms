import { useArchiver, useArchiverDispatch } from "../../ArchiverContext";
import { useMemo } from "react";
import Image from "next/image";
import SectionWrapper from "../SectionWrapper";
import RowEditor from "./RowEditor";
import { Section } from "../../types";

export default function Edit() {
  const { currentSection, rows } = useArchiver()!;
  const dispatch = useArchiverDispatch()!;
  const rowsWithErrors = useMemo(() => {
    return rows.filter((row) => Object.keys(row.errors!).length > 0);
  }, [rows]);

  return (
    <>
      <SectionWrapper
        canGoBack={true}
        canProceed={rowsWithErrors.length === 0}
        title="Edit Rows"
        description="If there are any issues detected with the uploaded data, you can fix them here."
        section={Section.edit}
      >
        {rowsWithErrors.length ? (
          <div className="mt-6 md:mt-10">
            <h2 className="font-bold">Issues Found</h2>
            {rows?.map((row, i) => {
              if (Object.keys(row.errors!).length > 0) {
                return <RowEditor key={i} rowId={i} rowWithError={row} />;
              }
            })}
          </div>
        ) : (
          <div className="mt-6 flex w-full items-center gap-4 md:mt-10">
            <Image
              src="/check-circle-2.svg"
              width={25}
              height={25}
              alt=""
              role="presentation"
            />
            <p>No issues found. Click next to continue.</p>
          </div>
        )}
      </SectionWrapper>
    </>
  );
}
