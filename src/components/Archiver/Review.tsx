import { useArchiver } from "./ArchiverContext";
import SectionWrapper from "./SectionWrapper";
import { Section } from "./types";

export default function Review() {
  const { currentSection } = useArchiver()!;
  return (
    <>
      {currentSection === Section.review && (
        <SectionWrapper
          section={Section.review}
          title="Review"
          description="Confirm new additions to the archive."
        >
          <div></div>
        </SectionWrapper>
      )}
    </>
  );
}
