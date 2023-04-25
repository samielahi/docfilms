import SectionWrapper from "../SectionWrapper";
import { useArchiver } from "../../ArchiverContext";
import { useEffect, useState, useMemo } from "react";
import { Section } from "../../types";

export default function Review() {
  // const message = useIndexBuilder();

  return (
    <>
      <SectionWrapper
        canGoBack={true}
        canProceed={false}
        section={Section.review}
        title="Review Additions to the Archive"
        description="New movies and directors are being added to the search index."
      >
        <div className="mt-6 flex w-full justify-between md:mt-10">
          {/* <p>{message.length ? message : ""} </p> */}
        </div>
      </SectionWrapper>
    </>
  );
}

function useIndexBuilder() {
  const [message, setMessage] = useState("");
  const { currentSection, rows } = useArchiver()!;
  const serializableRows = useMemo(() => {
    return rows.map(({ date, ...rest }) => {
      return {
        ...rest,
        date: (date as Date).toISOString().split("T")[0],
      };
    });
  }, [rows]);

  useEffect(() => {
    const add = (async () => {
      if (currentSection === Section.review) {
        const response = await fetch("/api/addIndices", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(serializableRows),
        });

        const data = (await response.json()) as { message: string };
        setMessage(data.message);
      }
    })();
  }, [serializableRows, currentSection]);

  return message;
}
