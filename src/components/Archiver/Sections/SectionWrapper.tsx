import Button from "~/components/Button";
import { useArchiver, useArchiverDispatch } from "../ArchiverContext";
import type { ReactElement } from "react";
import type { Section } from "../types";

interface Props {
  section: Section;
  title: string;
  description: string;
  children: ReactElement;
  canProceed: boolean;
  canGoBack: boolean;
}

export default function SectionWrapper({
  section,
  title,
  description,
  children,
  canProceed,
  canGoBack,
}: Props) {
  const { currentSection } = useArchiver()!;
  const dispatch = useArchiverDispatch()!;

  function goToNextSection() {
    dispatch({
      type: "ADVANCE",
    });
  }

  function goToPreviousSection() {
    dispatch({
      type: "BACK",
    });
  }

  return (
    <>
      {currentSection === section && (
        <div className="flow mt-6 w-full md:p-10">
          <div className="w-full">
            <span className="text-base">Step {section + 1}/3</span>
            <h2 className="font-bold">{title}</h2>
            <p>{description}</p>
            <hr className="mt-6 border-t-[1px] border-gray/20 bg-none md:mt-10" />
          </div>

          {children}

          <div className={`flex w-full items-center justify-end gap-4`}>
            {canGoBack && (
              <Button onClick={goToPreviousSection}>
                <span>back</span>
              </Button>
            )}
            {canProceed && (
              <Button onClick={goToNextSection}>
                <span>next</span>
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
