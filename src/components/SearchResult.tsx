import Link from "next/link";
import type { Movies } from "@prisma/client";

export default function SearchResult(props: Partial<Movies>) {
  // This should be impossible since we'll ONLY render this component if there is data
  if (!props.title) throw new Error("Movie has no title");

  return (
    <Link href={`/movies/${props.title}?year=${props.year!}`}>
      <div className="flex w-full cursor-pointer justify-between gap-4 bg-white p-4 decoration-orange underline-offset-4 hover:bg-slate-100 hover:underline">
        <h3 className="text-sm capitalize text-black md:text-lg">
          {props.title} {props.year ? `(${props.year})` : ""}
        </h3>
        <span className="text-sm capitalize italic text-gray md:text-lg">
          {props.director ? props.director : ""}
        </span>
      </div>
    </Link>
  );
}
