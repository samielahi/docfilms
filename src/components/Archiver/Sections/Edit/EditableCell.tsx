import { CellWrapper } from "./Cell";
import type { Column } from "../../types";
import type { ChangeEvent } from "react";

type Props = {
  type: Column;
  value: string | number | Date;
  handleChange: (e: ChangeEvent, type: Column) => void;
};

export default function EditableCell({ type, value, handleChange }: Props) {
  if (type === "year") {
    return (
      <CellWrapper type="year">
        <input
          type="number"
          min={1895}
          max={new Date().getFullYear()}
          value={value as number}
          onChange={(e) => {
            handleChange(e, type);
          }}
          className="mr-[-1px] border-[1px] border-orange bg-black px-4 py-2 text-base text-white focus:outline-none"
        />
      </CellWrapper>
    );
  }

  if (type === "date") {
    return (
      <CellWrapper type="date">
        <input
          type="date"
          min="1895-01-01"
          max={new Date().toISOString().split("T")[0]}
          value={(value as Date).toISOString().split("T")[0]}
          onChange={(e) => {
            handleChange(e, type);
          }}
          className="mr-[-1px] w-min border-[1px] border-orange bg-black px-4 py-2 text-base focus:outline-none"
        />
      </CellWrapper>
    );
  }

  return (
    <CellWrapper type={type}>
      <input
        type="text"
        value={value as string}
        min={1}
        onChange={(e) => {
          handleChange(e, type);
        }}
        className="mr-[-1px] w-min border-[1px] border-orange bg-black px-4 py-2 text-base text-white "
      />
    </CellWrapper>
  );
}
