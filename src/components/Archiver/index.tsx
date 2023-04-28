import { ArchiverProvider } from "./ArchiverContext";
import SectionProgress from "./SectionProgress";
import Upload from "./Sections/Upload/Upload";
import Edit from "./Sections/Edit/Edit";
import Review from "./Sections/Review/Review";

export default function Archiver() {
  return (
    <ArchiverProvider>
      <div>
        <h1 className="font-bold">Archiver Tool</h1>
        <p>Follow these steps to archive capsule data for the quarter.</p>
        <hr className="mt-6 w-full border-t-[1px] border-gray/20 md:mt-10" />
      </div>
      <section className="flex flex-col md:flex-row">
        <SectionProgress />
        <Upload />
        <Edit />
        <Review />
      </section>
    </ArchiverProvider>
  );
}
