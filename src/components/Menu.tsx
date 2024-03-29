import Link from "next/link";
import { useEffect, useState } from "react";
import useViewportWidth from "../hooks/useViewportWidth";
import { useSession, signIn, signOut } from "next-auth/react";
import type { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export default function Menu({ children }: Props) {
  const { status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const currentWidth = useViewportWidth();
  const breakpoint = 768; // TailwindCSS 'md' breakpoint width

  //  Close an open menu once 'md' width breakpoint is crossed
  useEffect(() => {
    if (currentWidth! > breakpoint && isOpen) {
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
            className="h-[6px] w-10 origin-top-left bg-gray transition-transform duration-300"
          ></span>
          <span
            style={isOpen ? { opacity: "0" } : { opacity: "100" }}
            className="h-[6px] w-10 bg-orange transition-opacity duration-300"
          ></span>
          <span
            style={isOpen ? { transform: "rotate(-45deg)" } : {}}
            className="h-[6px] w-10 origin-top-left bg-gray transition-all duration-300"
          ></span>
        </div>
      </button>

      {isOpen && (
        <div className="wrapper mt-4 flex h-full flex-col items-center justify-center gap-4">
          {status === "authenticated" ? (
            <div className="flex flex-col gap-4">
              <Link href={"/archiver"} className="link font-bold">
                archiver
              </Link>
              <p onClick={() => signOut()} className="link font-bold">
                sign out
              </p>
            </div>
          ) : (
            <Link href={"/signIn"} className="link w-fit font-bold">
              sign in
            </Link>
          )}

          <div className="relative mt-2 h-[45px] w-[300px]">
            <div className="absolute top-0">{children}</div>
          </div>
        </div>
      )}
    </>
  );
}
