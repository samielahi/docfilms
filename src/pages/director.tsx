import { type NextPage } from "next";
import Head from "next/head";
import Logo from "~/core/Logo";
import Image from "next/image";
import Link from "next/link";
import { getRandomInt } from "~/utils/utils";

const Director: NextPage = () => {
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

      <main className="wrapper h-full text-black dark:text-white">
        <div className="flex flex-col items-center md:flex-row md:gap-20">
          <Image
            className="w-[350px] md:w-[500px]"
            src={"/quentin.jpg"}
            width={500}
            height={500}
            alt=""
          ></Image>
          <div className="my-10">
            <div className="flow flex flex-col">
              <h1>Quentin Tarantino</h1>

              <p>
                Quentin Jerome Tarantino (born March 27, 1963) is an American
                film director, screenwriter, producer, cinematographer and
                actor. In the early 1990s he was an independent filmmaker whose
                films used nonlinear storylines and aestheticization of
                violence.
              </p>

              <div>
                <h2>
                  Tarantino @ <span className="font-logo font-bold">doc</span>
                </h2>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-10" />

        <div className="flow">
          <h2>
            Movies Shown @ <span className="font-logo font-bold">doc</span>
          </h2>

          <div className="flex flex-wrap justify-center gap-10 pb-10 text-center md:justify-start">
            {/* <Link href={"/movie"}>
              <div className="relative h-[175px] w-[350px]">
                <Image
                  src={`/${getRandomInt(1, 3)}.png`}
                  fill={true}
                  alt=""
                  className="-z-1 opacity-80"
                />
                <div className="absolute h-full w-full">
                  <h3 className="p-[75px] flex h-full items-center justify-center text-black underline decoration-orange">
                    <span>Harry Potter and the Chamber of Secrets</span>
                  </h3>
                </div>
              </div>
            </Link> */}
          </div>
        </div>
      </main>
    </>
  );
};

export default Director;
