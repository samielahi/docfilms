import Link from "next/link";
import useFocus from "~/hooks/useFocus";
import Icon from "../Icon";
import { useSearch } from "./SearchContext";
import type { SearchResult } from "./types";

interface Props extends Partial<SearchResult> {
  focus: boolean;
}

export default function SearchResultItem(props: Props) {
  const { fullSize } = useSearch()!;
  const ref = useFocus<HTMLAnchorElement>(props.focus);

  return (
    <>
      <Link
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
          <Icon name={props.group!} />

          <p className={`text-sm md:text-base ${fullSize ? "md:text-xl" : ""}`}>
            {props.index} {props.year && <span> ({props.year})</span>}
          </p>
        </li>
      </Link>
    </>
  );
}
