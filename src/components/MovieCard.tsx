import Link from "next/link";
import Image from "next/image";

export interface MovieCardProps {
  title: string;
  year?: number;
  count?: number;
}

export default function MovieCard(props: MovieCardProps) {
  const { title, year, count } = props;
  return (
    <Link href={`/movies/${title}?year=${year!}`}>
      <div className="group mt-[-1px] ml-[-1px] flex h-[480px] w-[420px] flex-col justify-between border-[1px] border-gray p-12 text-left transition-colors hover:bg-gray hover:text-black">
        <div>
          <span className="text-sm font-bold text-gray underline underline-offset-2 group-hover:text-black">
            Shown {count} {count! > 1 ? "times" : "time"}
          </span>
          <h2 className="mt-8 text-4xl capitalize">
            {title}{" "}
            {year ? (
              <span className="text-base font-bold text-gray group-hover:text-black">
                ({year})
              </span>
            ) : (
              ""
            )}
          </h2>
        </div>

        <Image
          src="/pulp.jpg"
          width={300}
          height={250}
          className="mt-4 w-full"
          alt=""
        />
      </div>
    </Link>
  );
}
