import type { Column, Row } from "../types";
import type { Updater } from "use-immer";

type Props = {
  type: Column;
  value: string | number | Date;
  setValue?: Updater<Row>;
};

export default function EditableCell(props: Props) {
  const { type, value, setValue } = props;

  if (type === "year") {
    return (
      <div className="flex flex-col items-center gap-2">
        <span className="text-base font-bold">{type}</span>

        <input
          type="number"
          min={1895}
          max={new Date().getFullYear()}
          value={value as number}
          onChange={(e) => {
            const newYearValue = parseInt(e.target.value);
            setValue!((draft) => {
              draft[type] = newYearValue;
            });
          }}
          className="mr-[-1px] border-[1px] border-gray/20 bg-black px-4 py-2 text-base text-white focus:outline-none"
        />
      </div>
    );
  }

  if (type === "date") {
    return (
      <div className="flex flex-col items-center gap-2">
        <span className="text-base font-bold">{type}</span>
        <input
          type="date"
          min="1895-01-01"
          max={new Date().toISOString().split("T")[0]}
          value={(value as Date).toISOString().split("T")[0]}
          onChange={(e) => {
            setValue!((draft) => {
              draft[type] = e.target.value;
            });
          }}
          className="mr-[-1px] w-min border-[1px] border-gray/20 bg-black px-4 py-2 text-base focus:outline-none"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-base font-bold">{type}</span>
      <input
        type="text"
        value={value as string}
        min={1}
        onChange={(e) => {
          setValue!((draft) => {
            draft[type] = e.target.value;
          });
        }}
        className="mr-[-1px] w-min border-[1px] border-gray/20 bg-black px-4 py-2 text-base  text-white focus:outline-none"
      />
    </div>
  );
}
