import { useArchiver } from "./ArchiverContext";

export default function UploadStage() {
  const { currentStage } = useArchiver()!;
  return <>{currentStage === 1 && <div>Welcome to the edit stage</div>}</>;
}
