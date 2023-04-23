import { err } from "true-myth/dist/public/result";
import { useArchiver } from "../ArchiverContext";
import SectionWrapper from "../SectionWrapper";
import RowEditor from "./RowEditor";
import { Section } from "../types";

export default function EditSection() {
  const { currentSection, rows } = useArchiver()!;
  const rowsWithErrors = rows.filter(
    (row) => Object.keys(row.errors!).length !== 0
  );
  return (
    <>
      {currentSection === Section.edit && (
        <SectionWrapper
          title="Edit Rows"
          description="If there are any issues detected with the uploaded data, you can fix them here."
          section={currentSection}
        >
          <div className="mt-6 md:mt-10">
            <h2 className="font-bold">Issues Found</h2>
            {rowsWithErrors?.map((row, i) => (
              <RowEditor key={i} id={i} rowWithError={row} />
            ))}
          </div>
        </SectionWrapper>
      )}
    </>
  );
}
