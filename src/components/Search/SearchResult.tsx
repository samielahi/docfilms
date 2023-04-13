import Link from "next/link";
import Image from "next/image";
import useFocus from "~/hooks/useFocus";
import type { SearchResult, ResultGroup } from "./types";
import type { MutableRefObject } from "react";

interface Props extends Partial<SearchResult> {
  focus: boolean;
}

export default function SearchResult(props: Props) {
  const ref = useFocus(props.focus);
  return (
    <>
      <li
        tabIndex={props.focus ? 1 : 0}
        ref={ref as MutableRefObject<HTMLLIElement>}
        className="w-full hover:bg-slate-100 focus:bg-slate-100"
        aria-selected={props.focus ? "true" : "false"}
        role="option"
        // Include label so screen readers can announce which group the result is from
        aria-label={`${props.index!}, jump to this ${props.group!}`}
      >
        <Link
          href={"/"}
          tabIndex={-1}
          className="flex gap-4 px-4 py-2 md:px-6 md:py-4"
        >
          <Image
            src={getResultIcon(props.group!)}
            width={15}
            height={15}
            className="w-[15px] text-orange/50 sm:w-auto"
            role="presentation"
            alt=""
          />
          <p className="text-sm italic md:text-xl">
            {props.index} {props.year && <span> ({props.year})</span>}
          </p>
        </Link>
      </li>
    </>
  );
}

function getResultIcon(group: ResultGroup) {
  switch (group) {
    case "movie":
      return "/film.svg";
    case "director":
      return "/megaphone.svg";
    case "quarter":
      return "/calendar-clock.svg";
  }
}
