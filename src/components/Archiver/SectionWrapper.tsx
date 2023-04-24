import type { ReactElement } from "react";
import type { Section } from "./types";

interface Props {
  section: Section;
  title: string;
  description: string;
  children: ReactElement;
}

export default function SectionWrapper({
  section,
  title,
  description,
  children,
}: Props) {
  return (
    <>
      <div className="mt-6 w-full md:p-10">
        <div className="w-full">
          <span className="text-base">Step {section + 1}/6</span>
          <h2 className="font-bold">{title}</h2>
          <p>{description}</p>
          <hr className="mt-6 border-t-[1px] border-gray/20 bg-none md:mt-10" />
        </div>
        {children}
      </div>
    </>
  );
}
