import Head from "next/head";
import Logo from "~/components/Logo";
import Search from "~/components/Search/Search";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const { status } = useSession();

  return (
    <>
      <Head>
        <title>docfilms archive</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative flex h-screen flex-col items-center justify-between overflow-hidden">
        <div className="absolute top-[4%] left-[calc(100%_-_6rem)] md:left-[calc(100%_-_8rem)]">
          {status === "authenticated" ? (
            <div className="flex flex-col gap-2">
              <Link href={"/archiver"} className="link font-bold">
                archiver
              </Link>
              <p
                className="link font-bold"
                role="button"
                onClick={() => signOut()}
              >
                sign out
              </p>
            </div>
          ) : (
            <Link href={"/signIn"} className="link font-bold">
              sign in
            </Link>
          )}
        </div>
        <div className="mt-28 flex w-fit flex-col items-center gap-8">
          <Logo size="large" />
          <Search fullSize />
        </div>
      </main>
    </>
  );
};

export default Home;
