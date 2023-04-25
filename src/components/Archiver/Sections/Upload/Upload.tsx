import SectionWrapper from "../SectionWrapper";
import LoadCSV from "./LoadCSV";
import UploadStatus from "./UploadStatus";
import { Section } from "../../types";

export default function Upload() {
  return (
    <>
      <SectionWrapper
        canGoBack={false}
        canProceed={true}
        section={Section.upload}
        title="Upload Capsule"
        description="Export the quarterly capsule spreadsheet as a .csv and upload here. Please make sure that the .csv follows the guidelines before uploading."
      >
        <div className="flow mt-10">
          {/* <LoadCSV />
            <div>
              <UploadStatus />
            </div> */}
        </div>
      </SectionWrapper>
    </>
  );
}
