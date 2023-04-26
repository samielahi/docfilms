import Head from "next/head";
import Logo from "~/components/Logo";
import Icon from "~/components/Icon";
import Image from "next/image";
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
        <div className="absolute top-[4%] w-full">
          {status === "authenticated" ? (
            <div className="wrapper flex justify-end gap-8">
              <Link
                href={"/archiver"}
                className="link text-base font-bold md:text-xl"
              >
                <span>archiver</span>
              </Link>
              <p
                className="link text-base font-bold md:text-xl"
                role="button"
                onClick={() => signOut()}
              >
                sign out
              </p>
            </div>
          ) : (
            <div className="wrapper flex w-full justify-end">
              <Link
                href={"/signIn"}
                className="link text-base font-bold md:text-xl"
              >
                sign in
              </Link>
            </div>
          )}
        </div>
        <div className="mt-28 flex w-fit flex-col items-center gap-8">
          <Logo size="large" />
          <Search fullSize />
          <Image
            className="absolute top-[80%] sm:top-[70%] md:top-[60%] lg:top-[60%] xl:top-[52%]"
            priority
            src={"/tickets.png"}
            width={1920}
            height={500}
            role="presentation"
            alt=""
          />
        </div>
      </main>
    </>
  );
};

export default Home;
