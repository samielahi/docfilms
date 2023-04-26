import Image from "next/image";
import { useArchiver } from "./ArchiverContext";

type SectionName = "upload" | "edit" | "review";

// Sidebar used in Archiver component to indicate which section user is on
export default function SectionProgress() {
  const sectionNames: SectionName[] = ["upload", "edit", "review"];
  const { currentSection } = useArchiver()!;
  return (
    <>
      <div className="w-full border-b-[1px] border-gray/20 md:w-fit md:border-b-0 md:border-r-[1px]">
        <div className="flex w-full justify-evenly gap-4 p-6 md:w-fit md:flex-col md:gap-8 md:p-10">
          {sectionNames.map((sectionName, i) => (
            <SectionProgressBlock
              key={i}
              currentSection={sectionNames[currentSection!]!}
              section={sectionName}
            />
          ))}
        </div>
      </div>
    </>
  );
}

function SectionProgressBlock({
  section,
  currentSection,
}: {
  section: SectionName;
  currentSection: SectionName;
}) {
  return (
    <>
      <div className="flex h-full w-fit items-center justify-between md:w-[200px]">
        <span className="hidden font-bold capitalize md:block">{section}</span>
        <div
          className={`flex items-center justify-center rounded-full ${
            currentSection === section ? "bg-orange" : "bg-white"
          } p-4`}
        >
          <Image
            src={getSectionIcon(section)}
            width={25}
            height={25}
            alt=""
            role="presentation"
            className="h-[20px] w-[20px] md:h-[25px] md:w-[25px]"
          />
        </div>
      </div>
    </>
  );
}

function getSectionIcon(section: SectionName) {
  switch (section) {
    case "upload":
      return "/icons/file-up.svg";
    case "edit":
      return "/icons/edit.svg";
    case "review":
      return "/icons/clipboard-check.svg";
  }
}
