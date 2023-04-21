import type { Dispatch, SetStateAction } from "react";
import type { DocMovie } from "~/types";

type Props = {
  type: keyof DocMovie;
  value: string | number;
  editable: boolean;
  setValue?: Dispatch<SetStateAction<any>>;
};

export default function Cell(props: Props) {
  const { type, value, editable, setValue } = props;

  if (type === "year") {
    return (
      <div className="flex flex-col items-center gap-2">
        <span
          className={`text-base font-bold ${editable ? "text-orange" : ""}`}
        >
          {type}
        </span>
        {editable ? (
          <input
            type="number"
            min={1895}
            max={new Date().getFullYear()}
            value={value}
            onChange={(e) => {
              const newYearValue = parseInt(e.target.value);
              setValue!(newYearValue);
            }}
            className="mr-[-1px] border-[1px] border-gray/20 bg-black px-4 py-2 text-base text-white focus:outline-none"
          />
        ) : (
          <span className="mr-[-1px] border-[1px] border-gray/20 px-4 py-2 text-base">
            {value}
          </span>
        )}
      </div>
    );
  }

  if (type === "date") {
    return (
      <div className="flex  flex-col items-center gap-2">
        <span
          className={`text-base font-bold ${editable ? "text-orange" : ""}`}
        >
          {type}
        </span>

        {editable ? (
          <input
            type="date"
            min="1895-01-01"
            max={new Date().toISOString().split("T")[0]}
            value={value}
            onChange={(e) => {
              setValue!(e.target.value);
            }}
            className="mr-[-1px] w-min border-[1px] border-gray/20 bg-black px-4 py-2 text-base focus:outline-none"
          />
        ) : (
          <span className="mr-[-1px] border-[1px] border-gray/20 px-4 py-2 text-base">
            {value}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <span className={`text-base font-bold ${editable ? "text-orange" : ""}`}>
        {type}
      </span>
      {editable ? (
        <input
          type="text"
          value={value}
          min={1}
          onChange={(e) => {
            setValue!(e.target.value);
          }}
          className="mr-[-1px] w-min border-[1px] border-gray/20 bg-black px-4 py-2 text-base  text-white focus:outline-none"
        />
      ) : (
        <span className="mr-[-1px] border-[1px] border-gray/20 px-4 py-2 text-base">
          {value}
        </span>
      )}
    </div>
  );
}
