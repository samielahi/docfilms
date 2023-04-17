import Logo from "./Logo";
import Search from "./Search/Search";
import Link from "next/link";
import Menu from "./Menu";

export default function Header() {
  return (
    <header className="fixed top-0 z-[9999] w-full border-b-[1px] border-gray/20 bg-black py-6 md:h-[100px]">
      <div className="wrapper flex items-center justify-between">
        <Logo size="small" />
        <div className="hidden items-center gap-12 md:flex">
          <div className="relative h-[45px] w-[450px]">
            <div className="absolute top-0">
              <Search fullSize={false} />
            </div>
          </div>
          <Link
            href={"/"}
            className="w-fit font-bold underline decoration-orange decoration-2 underline-offset-2 transition-all hover:underline-offset-4"
          >
            <p>Log in</p>
          </Link>
        </div>
      </div>
      <Menu>
        <Search fullSize />
      </Menu>
    </header>
  );
}
