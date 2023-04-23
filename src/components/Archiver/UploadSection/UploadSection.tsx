import SectionWrapper from "../SectionWrapper";
import LoadCSV from "./LoadCSV";
import UploadStatus from "./UploadStatus";
import { useArchiver } from "../ArchiverContext";
import { Section } from "../types";

export default function UploadSection() {
  const { currentSection } = useArchiver()!;
  return (
    <>
      {currentSection === Section.upload && (
        <SectionWrapper
          section={currentSection}
          title="Upload Capsule"
          description="Export the quarterly capsule spreadsheet as a .csv and upload here. Please make sure that the .csv follows the guidelines before uploading."
        >
          <div className="flow mt-10">
            <LoadCSV />
            <div>
              <UploadStatus />
            </div>
          </div>
        </SectionWrapper>
      )}
    </>
  );
}
