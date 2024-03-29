import Logo from "./Logo";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className="relative mt-16 flex h-[250px] w-full items-center justify-between border-t-[1px] border-gray/20 py-4 backdrop-blur-2xl">
        <div className="wrapper flex items-center gap-4">
          <span className="w-[100px] text-base italic text-gray">
            Images and some data courtesy of:
          </span>

          <Link href={"https://www.themoviedb.org/"} className="w-fit">
            <Image
              src={"/moviedb-logo.svg"}
              width={100}
              height={100}
              alt="The MovieDB Logo"
            ></Image>
          </Link>
        </div>
      </footer>
    </>
  );
}
