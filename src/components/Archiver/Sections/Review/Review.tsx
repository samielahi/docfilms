import SectionWrapper from "../SectionWrapper";
import { useArchiver } from "../../ArchiverContext";
import { useEffect, useState, useMemo } from "react";
import { Section } from "../../types";
import Button from "~/components/Button";
import Image from "next/image";

export default function Review() {
  const [confirmation, setConfirmation] = useState(false);
  const { rows } = useArchiver()!;
  const messages = useAddRecords(confirmation);

  return (
    <>
      <SectionWrapper
        canGoBack={false}
        canProceed={false}
        section={Section.review}
        title="Review Additions to the Archive"
        description="Confirm any new additions to the archive and any new movies and directors to the search index."
      >
        <div className="flow mt-6 flex w-full flex-col justify-between md:mt-10">
          {!confirmation && <p>Add {rows.length} movie(s) to the archive?</p>}
          {confirmation &&
            messages.map((message, i) => (
              <div className="flex gap-4" key={i}>
                <Image
                  src="/check-circle-2.svg"
                  width={25}
                  height={25}
                  alt=""
                  role="presentation"
                />
                <span>{message}</span>
              </div>
            ))}
          {!confirmation && (
            <Button onClick={() => setConfirmation(true)}>
              <span>confirm</span>
            </Button>
          )}
        </div>
      </SectionWrapper>
    </>
  );
}

function useAddRecords(shouldSubmit: boolean) {
  const [message, setMessage] = useState([""]);
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
      if (currentSection === Section.review && shouldSubmit) {
        const response = await fetch("/api/addRecords", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(serializableRows),
        });

        const data = (await response.json()) as { message: string[] };
        setMessage(data.message);
      }
    })();
  }, [serializableRows, currentSection, shouldSubmit]);

  return message;
}
