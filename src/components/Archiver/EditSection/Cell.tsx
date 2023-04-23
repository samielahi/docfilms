import type { Column } from "../types";

type Props = {
  type: Column;
  value: string | number | Date;
};

export default function Cell(props: Props) {
  const { type, value } = props;

  if (type === "year") {
    return (
      <div className="flex flex-col items-center gap-2">
        <span className="text-base font-bold">{type}</span>
        <span className="mr-[-1px] border-[1px] border-gray/20 px-4 py-2 text-base">
          {value as number}
        </span>
      </div>
    );
  }

  if (type === "date") {
    return (
      <div className="flex  flex-col items-center gap-2">
        <span className="text-base font-bold">{type}</span>

        <span className="mr-[-1px] border-[1px] border-gray/20 px-4 py-2 text-base">
          {(value as Date).toISOString().split("T")[0]}
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-base font-bold">{type}</span>
      <span className="mr-[-1px] border-[1px] border-gray/20 px-4 py-2 text-base">
        {value as string}
      </span>
    </div>
  );
}
