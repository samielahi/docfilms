import { useArchiver } from "../ArchiverContext";
import SectionWrapper from "../SectionWrapper";
import RowEditor from "./RowEditor";
import { Section } from "../types";
import type { Row } from "../types";

export default function EditSection() {
  const { currentSection, rows } = useArchiver()!;
  const hasErrors = (row: Row) => Object.keys(row.errors!).length > 0;
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
            {rows?.map((row, i) => {
              if (hasErrors(row)) {
                return <RowEditor key={i} rowId={i} rowWithError={row} />;
              }
            })}
          </div>
        </SectionWrapper>
      )}
    </>
  );
}
