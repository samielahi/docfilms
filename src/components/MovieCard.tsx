import Link from "next/link";

export interface MovieCardProps {
  title: string;
  year?: number;
  count: number;
}

export default function MovieCard(props: MovieCardProps) {
  const { title, year, count } = props;
  return (
    <Link href={`/movies/${title}?year=${year}`}>
      <div className="relative w-[330px] h-[175px] hover:border-orange border-4 border-yellow p-8 transition-transform">
        <h3>
          <i className="mr-2 capitalize underline decoration-orange decoration-4 underline-offset-4">
            {title}
          </i>
        </h3>
        <span className="text-base font-bold">
          Shown {count} {count > 1 ? "times" : "time"}
        </span>
        {year ? <p className="text-base">({year})</p> : <></>}
      </div>
    </Link>
  );
}
