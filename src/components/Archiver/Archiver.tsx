import { ArchiverProvider } from "./ArchiverContext";
import ArchiverProgressBar from "./ArchiverProgressBar";
import UploadStage from "./UploadStage";
import EditStage from "./EditStage";

export default function Archiver() {
  return (
    <ArchiverProvider>
      <div className="flow flex h-full min-h-[40vh] flex-col items-center border-[0px] border-gray/20 p-12">
        <h2 className="font-bold">Add Data To Archive</h2>
        <ArchiverProgressBar />
        <hr className="w-full border-t-[1px] border-gray/20 bg-none" />
        <UploadStage />
        <EditStage />
      </div>
    </ArchiverProvider>
  );
}
