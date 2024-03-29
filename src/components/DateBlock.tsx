import { getDateObject } from "~/utils";

export interface DateBlockProps {
  date?: string;
}

export default function DateBlock(props: DateBlockProps) {
  const dateObject = getDateObject(props.date!);
  const { month, year } = dateObject;

  return (
    <div className="m-0 flex h-[70px] w-[70px] flex-col items-center justify-center bg-yellow p-4 text-center text-sm font-bold text-black md:text-lg">
      <span className="uppercase">{month}</span>
      <span>{year}</span>
    </div>
  );
}
