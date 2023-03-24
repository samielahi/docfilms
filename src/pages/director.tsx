import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Header from "~/components/Header";
import MovieCard from "~/components/MovieCard";
import BarPlot from "~/components/BarPlot";

const Director: NextPage = () => {
  return (
    <>
      <Head>
        <title>docfilms archive</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="wrapper h-full w-full text-black dark:text-white">
        <div className="flex flex-col items-center md:flex-row md:gap-20">
          <Image
            className="w-[300px] border-4 border-orange sm:w-[350px] md:w-[500px]"
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

              <div className="hidden h-full flex-col md:flex">
                <h2>
                  Tarantino @ <span className="font-logo font-bold">doc</span>
                </h2>

                <BarPlot
                  xOffset={80}
                  yOffset={60}
                  width={600}
                  height={300}
                  data={{
                    domain: [1920, 2020],
                    range: [0, 50],
                    values: [
                      [1930, 20],
                      [1940, 12],
                      [2000, 8],
                      [2010, 18],
                    ],
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <span className="my-10 h-1 w-[400px] border-2 border-black" />

        <div className="flow">
          <h2>
            Their Movies Shown @{" "}
            <span className="font-logo font-bold">doc</span>
          </h2>

          <div className="flex flex-wrap justify-center gap-10 pb-10 text-center md:justify-start">
            <MovieCard title="Pulp Fiction" year={1994} />
            <MovieCard title="Kill Bill Vol. 1" year={2003} />
            <MovieCard title="Kill Bill Vol. 2" year={2004} />
          </div>
        </div>
      </main>
    </>
  );
};

export default Director;
