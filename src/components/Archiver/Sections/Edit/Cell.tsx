import type { ReactElement } from "react";
import type { Column } from "../../types";

type Props = {
  type: Column;
  value: string | number | Date;
};

export default function Cell(props: Props) {
  const { type, value } = props;

  if (type === "year") {
    return (
      <CellWrapper type="year">
        <span className="mr-[-1px] border-[1px] border-gray/20 px-4 py-2 text-base">
          {value as number}
        </span>
      </CellWrapper>
    );
  }

  if (type === "date") {
    return (
      <CellWrapper type="date">
        <span className="mr-[-1px] border-[1px] border-gray/20 px-4 py-2 text-base">
          {(value as Date).toISOString().split("T")[0]}
        </span>
      </CellWrapper>
    );
  }

  return (
    <CellWrapper type={type}>
      <span className="mr-[-1px] border-[1px] border-gray/20 px-4 py-2 text-base">
        {value as string}
      </span>
    </CellWrapper>
  );
}

export function CellWrapper({
  type,
  children,
}: {
  type: Column;
  children: ReactElement;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-base font-bold">{type}</span>
      {children}
    </div>
  );
}
