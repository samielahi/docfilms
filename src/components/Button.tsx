import type { ReactElement } from "react";

type Props = {
  onClick: () => void;
  children: ReactElement;
};

export default function Button({ onClick, children }: Props) {
  return (
    <>
      <button
        onClick={onClick}
        className="w-[125px] border-[1px] border-gray px-4 py-2 font-bold transition-colors duration-300 hover:bg-gray hover:text-black"
      >
        {children}
      </button>
    </>
  );
}
