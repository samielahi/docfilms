import Head from "next/head";
import { prisma } from "~/server/db";
import Header from "~/components/Header";
import type { GetServerSideProps } from "next";
import type { DirectorPageProps, DocMovie } from "~/types";
import type { QueryParams } from "~/types";

// export const getServerSideProps: GetServerSideProps<
//   DirectorPageProps,
//   QueryParams
// > = async ({ params }) => {

// };

export default function Director(props: DirectorPageProps) {
  return (
    <>
      <Head>
        <title>docfilms archive</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
    </>
  );
}
