import Link from "next/link";

export interface MovieCardProps {
  title: string;
  link?: string;
  year?: number;
}

export default function MovieCard(props: MovieCardProps) {
  return (
    <Link href={"/movie"}>
      <div className="relative w-[300px] border-2  border-yellow p-10 transition-transform hover:skew-y-3">
        <h3>
          <i className="mr-2 underline decoration-orange decoration-4 underline-offset-4">
            {props.title}
          </i>
          {props.year ? <span className="text-sm">({props.year})</span> : <></>}
        </h3>
        <span></span>
      </div>
    </Link>
  );
}
