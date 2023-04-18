import Link from "next/link";
import Image from "next/image";

export interface MovieCardProps {
  title: string;
  year?: number;
  count?: number;
  backdrop_path?: string;
}

export default function MovieCard(props: MovieCardProps) {
  const { title, year, count, backdrop_path } = props;
  return (
    <Link href={`/movie/${title}?year=${year!}`}>
      <div className="group flex h-[375px] flex-col justify-between border-[1px] border-gray/20 p-12 text-left transition-colors hover:bg-gray hover:text-black md:h-[480px] md:w-[420px]">
        <div>
          <span className="text-sm font-bold text-gray underline underline-offset-2 group-hover:text-black">
            Shown {count} {count! > 1 ? "times" : "time"}
          </span>
          <h3 className="mt-8 text-2xl font-bold capitalize italic md:text-4xl">
            {title}{" "}
            {year ? (
              <span className="text-base font-bold not-italic group-hover:text-black">
                ({year})
              </span>
            ) : (
              ""
            )}
          </h3>
        </div>

        <Image
          src={backdrop_path || "/student.png"}
          width={300}
          height={250}
          className="mt-4 w-full grayscale"
          alt=""
        />
      </div>
    </Link>
  );
}
