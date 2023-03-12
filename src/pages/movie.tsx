import { type NextPage } from "next";
import Head from "next/head";
import Logo from "~/core/Logo";
import Image from "next/image";
import Link from "next/link";

const Test: NextPage = () => {
  return (
    <>
      <Head>
        <title>docfilms archive</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="wrapper flex justify-between py-10">
        <Logo size="small" />
        <div className="flex items-center gap-4">
          <input
            className="mr-2"
            type="checkbox"
            name="dark-mode"
            id="dark-mode"
          />
          <label className="font-bold" htmlFor="dark-mode">
            dark mode
          </label>
        </div>
      </header>

      <main className="wrapper h-full overflow-hidden text-black dark:text-white">
        <div className="relative mb-10 h-[300px] overflow-hidden drop-shadow-sm  md:h-[500px]">
          <Image
            src={"/pulp.png"}
            className="object-cover object-top"
            fill={true}
            alt=""
          ></Image>
        </div>
        <section className="mb-10">
          <div className="flow flex flex-col">
            <div className="flex items-center gap-6">
              <h1>
                <i>Pulp Fiction </i> <span className="text-2xl">(1994)</span>
              </h1>
            </div>

            <Link href={"/director"}>
              <p className="w-fit underline decoration-orange decoration-4 underline-offset-4">
                Quentin Tarantino
              </p>
            </Link>

            <p>
              A burger-loving hit man, his philosophical partner, a drug-addled
              gangster's moll and a washed-up boxer converge in this sprawling,
              comedic crime caper.
            </p>
          </div>

          <hr className="mt-8 mb-8 w-[100%]" />
          <div className="flow flex flex-col">
            <h2>
              Shown @ <span className="font-logo font-bold">doc</span> on:
            </h2>

            <div className="flex items-center gap-6">
              <div className="m-0 flex h-[70px] w-[70px] flex-col items-center justify-center bg-[#F4F4F4] p-4 text-center text-sm font-bold text-black dark:bg-yellow md:text-lg">
                <span>MAR</span>
                <span>1995</span>
              </div>
              <p className="hidden sm:block">as part of series</p>
              <Link href={"/"}>
                <p className="italic underline decoration-orange decoration-4 underline-offset-4">
                  Weekend - Spring 1995 (Doc and the Maiden)
                </p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Test;
