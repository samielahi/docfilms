import Link from "next/link";

interface SearchResultProps {
  title: string;
  director?: string;
  year?: number;
}

export default function SearchResult(props: SearchResultProps) {
  return (
    <Link
      className="group outline-orange"
      href={{
        pathname: `/movies/${props.title}`,
        query: { year: props.year },
      }}
    >
      <div className="flex w-full cursor-pointer justify-between gap-4 rounded-b-xl bg-[#fff] p-4 decoration-orange decoration-4 underline-offset-4  hover:underline  group-focus:underline">
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
