import { useArchiver } from "../ArchiverContext";

export default function EditSection() {
  const { currentSection } = useArchiver()!;
  return <>{currentSection === 1 && <div>Welcome to the edit stage</div>}</>;
}
