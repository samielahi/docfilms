import { useArchiver, useArchiverDispatch } from "../ArchiverContext";
import SectionWrapper from "../SectionWrapper";
import { useEffect } from "react";
import { Section } from "../types";

export default function IndexSection() {
  const { currentSection, rows } = useArchiver()!;
  const serializableRows = rows.map(({ date, ...rest }) => {
    return {
      ...rest,
      date: (date as Date).toISOString().split("T")[0],
    };
  });

  useEffect(() => {
    const add = (async () => {
      const response = await fetch("/api/addIndices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(serializableRows),
      });
      console.log(response);
    })();
  });

  return (
    <>
      {currentSection === Section.index && (
        <SectionWrapper
          section={currentSection}
          title="Update Index"
          description="The following movies and directors are going to be added to the search index."
        >
          <p>The index page.</p>
        </SectionWrapper>
      )}
    </>
  );
}
