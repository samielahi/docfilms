import SectionWrapper from "../SectionWrapper";
import UploadCSV from "./UploadCSV";
import UploadStatus from "./UploadStatus";
import { useArchiver } from "../ArchiverContext";

export default function UploadSection() {
  const { currentSection } = useArchiver()!;
  return (
    <>
      {currentSection === 0 && (
        <SectionWrapper
          section={currentSection}
          title="Upload Capsule"
          description="Export quarterly capsule spreadsheet as a .csv and upload. Please make sure that all required column headers are included."
        >
          <div className="flow mt-10">
            <UploadCSV />
            <div>
              <UploadStatus />
            </div>
          </div>
        </SectionWrapper>
      )}
    </>
  );
}
