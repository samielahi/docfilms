import SectionWrapper from "../SectionWrapper";
import CSVLoader from "./CSVLoader";
import { useArchiver } from "../../ArchiverContext";
import { Section } from "../../types";

export default function Upload() {
  const { rows } = useArchiver()!;
  return (
    <>
      <SectionWrapper
        canGoBack={false}
        canProceed={rows.length > 0}
        section={Section.upload}
        title="Upload Capsule"
        description="Export the quarterly capsule spreadsheet as a .csv and upload here."
      >
        <div className="flow mt-10">
          <CSVLoader />
        </div>
      </SectionWrapper>
    </>
  );
}
