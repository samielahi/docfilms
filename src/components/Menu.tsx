import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import useViewportWidth from "../hooks/useViewportWidth";
import Link from "next/link";

interface Props {
  children?: ReactNode;
}

export default function Menu({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const currentWidth = useViewportWidth();
  const breakpoint = 768; // TailwindCSS 'md' breakpoint width

  //  Close an open menu once 'md' width breakpoint is crossed
  useEffect(() => {
    if (currentWidth > breakpoint && isOpen) {
      setIsOpen(false);
    }
  }, [currentWidth, isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute left-[calc(100%_-_5rem)] top-[2.5rem] z-50 md:hidden"
      >
        <div className="flex cursor-pointer flex-col gap-1 ">
          <span
            style={
              isOpen
                ? {
                    transform: "rotate(45deg) translate(-0.1rem, -0.6rem)",
                  }
                : {}
            }
            className="h-[6px] w-10 origin-top-left rounded-sm bg-orange transition-transform duration-300"
          ></span>
          <span
            style={isOpen ? { opacity: "0" } : { opacity: "100" }}
            className="h-[6px] w-10 rounded-sm bg-violet transition-opacity duration-300"
          ></span>
          <span
            style={isOpen ? { transform: "rotate(-45deg)" } : {}}
            className="h-[6px] w-10 origin-top-left rounded-sm bg-white transition-all duration-300"
          ></span>
        </div>
      </button>

      {isOpen && (
        <div className="wrapper mt-4 flex h-full flex-col items-center justify-center gap-4">
          <Link
            href={"/"}
            className="w-fit font-bold underline decoration-orange decoration-2"
          >
            Log in
          </Link>
          <div className="relative h-[45px] w-[300px]">
            <div className="absolute top-0">{children}</div>
          </div>
        </div>
      )}
    </>
  );
}
