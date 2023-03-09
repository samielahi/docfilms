import Link from "next/link";
import type { Movies } from "@prisma/client";

export default function SearchResult(props: Partial<Movies>) {
  // This should be impossible since we'll ONLY render this component if there is data
  if (!props.title) throw new Error("Movie has no title");
  if (!props.year) throw new Error("Movie has no year");

  return (
    <Link href={`/movies/${props.title}?year=${props.year}`}>
      <div className="flex w-full cursor-pointer justify-between gap-4 bg-white p-4 hover:bg-slate-100">
        <h3 className="text-sm text-gray md:text-base">
          {props.title} {props.year ? `(${props.year})` : ""}
        </h3>
        <span className="text-sm italic text-gray md:text-base">
          {props.director ? props.director : ""}
        </span>
      </div>
    </Link>
  );
}
