import { getDateObject } from "~/utils/utils";

export interface DateBlockProps {
  date?: string;
}

export default function DateBlock(props: DateBlockProps) {
  const dateObject = getDateObject(props.date!);
  const { month, year } = dateObject;

  return (
    <div className="m-0 flex h-[70px] w-[70px] flex-col items-center justify-center bg-[#F4F4F4] p-4 text-center text-sm font-bold text-black dark:bg-yellow md:text-lg">
      <span className="uppercase">{month}</span>
      <span>{year}</span>
    </div>
  );
}
