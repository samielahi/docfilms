import { type NextPage } from "next";
import Head from "next/head";
import Logo from "~/core/Logo";
import Image from "next/image";

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

      <main className="wrapper h-full  text-black">
        <div className="full-bleed relative mb-10 h-[350px] overflow-hidden opacity-70 grayscale">
          <Image
            src={"/pulp.webp"}
            className="object-cover object-top w-fit"
            fill={true}
            alt=""
          ></Image>
        </div>
        <section>
          <div className="flow flex flex-col">
            <div className="flex items-center gap-6">
              <h1>
                Pulp Fiction <span className="text-2xl">(1994)</span>
              </h1>
            </div>

            <p className=" underline decoration-orange underline-offset-4">
              Quentin Tarantino
            </p>
            <p>
              A burger-loving hit man, his philosophical partner, a drug-addled
              gangster's moll and a washed-up boxer converge in this sprawling,
              comedic crime caper.
            </p>
          </div>

          <hr className="mt-8 mb-8 w-[80%] border-dashed" />
          <div className="flow flex flex-col">
            <h2>
              Shown @ <span className="font-logo font-bold">doc</span>
            </h2>

            <div className="flex items-center gap-6">
              <div className="m-0 flex h-[70px] w-[70px] flex-col items-center justify-center bg-[#F4F4F4] p-4 text-center font-mono text-sm font-bold text-black md:text-lg">
                <span>MAR</span>
                <span>1995</span>
              </div>
              <p className="hidden sm:block">as part of series</p>
              <p className="italic underline decoration-orange underline-offset-4">
                Weekend - Spring 1995 (Doc and the Maiden)
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Test;
