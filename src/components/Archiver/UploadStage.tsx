import UploadCSV from "./UploadCSV";
import ParseCSV from "./ParseCSV";
import { useArchiver } from "./ArchiverContext";

export default function UploadStage() {
  const { currentStage } = useArchiver()!;
  return (
    <>
      {currentStage === 0 && (
        <>
          <ParseCSV />
          <UploadCSV />
        </>
      )}
    </>
  );
}
