import Base from "~/layouts/Base";
import Archiver from "~/components/Archiver/Archiver";
import type { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";

const ArchiverPage: NextPageWithLayout = () => {
  return (
    <>
      <Archiver />
    </>
  );
};

ArchiverPage.getLayout = function getLayout(page: ReactElement) {
  return <Base title="Archiver">{page}</Base>;
};

export default ArchiverPage;
