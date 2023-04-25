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
        className="border-[1px] border-gray/20 px-4 py-2 font-bold hover:bg-gray hover:text-black"
      >
        {children}
      </button>
    </>
  );
}
