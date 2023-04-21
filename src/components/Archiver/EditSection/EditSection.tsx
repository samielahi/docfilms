import { err } from "true-myth/dist/public/result";
import { useArchiver } from "../ArchiverContext";
import SectionWrapper from "../SectionWrapper";
import RowEditor from "./RowEditor";

const movie = {
  title: "Pulp Fiction",
  series: "Neo-noir",
  director: "Quentin Tarantino",
  year: 1994,
  date: new Date("2001-02-02"),
};

export default function EditSection() {
  const { currentSection, data, errors } = useArchiver()!;
  return (
    <>
      {currentSection === 1 && (
        <SectionWrapper
          title="Edit Rows With Issues"
          description="If there are any issues detected with the uploaded data, you can fix them here."
          section={currentSection}
        >
          <div className="mt-6 md:mt-10">
            <h2 className="font-bold">Issues Found</h2>
            {errors?.map((error, i) => (
              <RowEditor
                key={i}
                errorId={i}
                movie={data![error.rowId]!}
                rowError={error}
              />
            ))}
          </div>
        </SectionWrapper>
      )}
    </>
  );
}
