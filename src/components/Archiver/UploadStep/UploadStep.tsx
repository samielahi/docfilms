import UploadCSV from "./UploadCSV";
import ParseCSV from "./ParseCSV";
import { useArchiver } from "../ArchiverContext";

export default function UploadStage() {
  const { currentStep: currentStage } = useArchiver()!;
  return (
    <>
      {currentStage === 0 && (
        <div className="flow">
          <UploadCSV />
          <ParseCSV />
        </div>
      )}
    </>
  );
}
