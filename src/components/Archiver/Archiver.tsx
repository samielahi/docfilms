import { ArchiverProvider } from "./ArchiverContext";
import ArchiverProgressBar from "./ArchiverProgressBar";
import UploadSection from "./UploadSection/UploadSection";
import EditSection from "./EditSection/EditSection";
import IndexSection from "./IndexSection";
import Review from "./Review";

export default function Archiver() {
  return (
    <ArchiverProvider>
      <div>
        <h1 className="font-bold">Archiver Tool</h1>
        <p>Follow these steps to archive capsule data for the quarter.</p>
        <hr className="mt-6 w-full border-t-[1px] border-gray/20 md:mt-10" />
      </div>
      <section className="flex flex-col md:flex-row">
        <ArchiverProgressBar />
        <UploadSection />
        <EditSection />
        <IndexSection />
        <Review />
      </section>
    </ArchiverProvider>
  );
}
