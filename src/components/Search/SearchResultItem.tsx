import Link from "next/link";
import Image from "next/image";
import useFocus from "~/hooks/useFocus";
import { useSearch } from "./SearchContext";
import useLocalStorage from "~/hooks/useLocalStorage";
import type { SearchResult, ResultGroup } from "./types";
import type { Dispatch, SetStateAction } from "react";

interface Props extends Partial<SearchResult> {
  focus: boolean;
}

export default function SearchResultItem(props: Props) {
  const { fullSize, currentQuery } = useSearch()!;
  const ref = useFocus<HTMLAnchorElement>(props.focus);
  // const [recentQueries, setRecentQueries] = useLocalStorage<string[]>(
  //   "recent_queries",
  //   []
  // );

  // function pushToRecentQueries() {
  //   // We'll treat the recentQueries array like a stack of fixed length 3
  //   if (recentQueries?.length! >= 3) {
  //     (recentQueries as string[]).pop();
  //   }
  //   (setRecentQueries as Dispatch<SetStateAction<string[] | undefined>>)([
  //     currentQuery,
  //     ...(recentQueries as string[]),
  //   ]);
  // }

  return (
    <>
      <Link
        // onClick={pushToRecentQueries}
        href={
          props.group === "movie"
            ? `/${props.group}/${props.index!}?year=${props.year!}`
            : `/${props.group!}/${props.index!}`
        }
        ref={ref}
        tabIndex={props.focus ? 0 : -1}
        className="w-full bg-black font-bold text-gray hover:bg-gray hover:text-black focus:bg-gray focus:text-black focus:outline-none"
        aria-selected={props.focus ? "true" : "false"}
        role="option"
        // Include label so screen readers can announce which group the result is from
        aria-label={`${props.index!}, go to this ${props.group!}`}
      >
        <li className="flex w-full gap-4 px-4 py-2 md:px-6 md:py-4">
          <Image
            src={getResultIcon(props.group!)}
            width={15}
            height={15}
            className="w-[20px] text-orange/50"
            role="presentation"
            alt=""
          />
          <p className={`text-sm md:text-base ${fullSize ? "md:text-xl" : ""}`}>
            {props.index} {props.year && <span> ({props.year})</span>}
          </p>
        </li>
      </Link>
    </>
  );
}

export function getResultIcon(group: ResultGroup): string {
  switch (group) {
    case "movie":
      return "/film.svg";
    case "director":
      return "/megaphone.svg";
    case "quarter":
      return "/calendar-clock.svg";
    case "recent":
      return "/clock.svg";
  }
}
