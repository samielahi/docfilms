import Base from "~/layouts/Base";
import Archiver from "~/components/Archiver/Archiver";
import { useSession } from "next-auth/react";
import type { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";

const ArchiverPage: NextPageWithLayout = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  if (loading) return null;

  if (!loading && !session) {
    return <p>You need to be signed in to access this page.</p>;
  }

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
