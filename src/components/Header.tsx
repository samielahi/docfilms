import Logo from "./Logo";
import Search from "./Search";
import Link from "next/link";
import Menu from "./Menu";
import { useSession, signOut } from "next-auth/react";
import autoAnimate from "@formkit/auto-animate";
import { useEffect, useRef } from "react";

export default function Header() {
  const { status } = useSession();
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <header
      ref={parent}
      className="fixed top-0 z-[9999] w-full border-b-[1px] border-gray/20 bg-black py-6 md:h-[100px]"
    >
      <div className="wrapper flex items-center justify-between">
        <Logo size="small" />
        <div className="hidden items-center gap-12 md:flex">
          <div className="relative h-[45px] w-[450px]">
            <div className="absolute top-0">
              <Search fullSize={false} />
            </div>
          </div>
          {status === "authenticated" ? (
            <div className="flex gap-8">
              <Link href={"/archiver"} className="link font-bold">
                archiver
              </Link>
              <p
                onClick={() => signOut()}
                className="link font-bold"
                role="button"
              >
                sign out
              </p>
            </div>
          ) : (
            <Link href={"/signIn"} className="link font-bold" role="button">
              sign in
            </Link>
          )}
        </div>
      </div>
      <Menu>
        <Search fullSize />
      </Menu>
    </header>
  );
}
