export interface DateBlockProps {
  month: string;
  year: number;
}

export default function DateBlock(props: DateBlockProps) {
  return (
    <div className="m-0 flex h-[70px] w-[70px] flex-col items-center justify-center bg-[#F4F4F4] p-4 text-center text-sm font-bold text-black dark:bg-yellow md:text-lg">
      <span className="uppercase">{props.month}</span>
      <span>{props.year}</span>
    </div>
  );
}
