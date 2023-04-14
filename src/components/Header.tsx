import Logo from "./Logo";
import Search from "./Search/Search";
import Link from "next/link";

import Menu from "./Menu";

export default function Header() {
  return (
    <header className="relative border-b-2 border-gray/60 py-6">
      <div className="wrapper flex items-center justify-between">
        <Logo size="small" />
        <div className="hidden items-center gap-12 md:flex">
          <div className="relative h-[45px] w-[300px]">
            <div className="absolute top-0">
              <Search fullSize={false} />
            </div>
          </div>
          <Link
            href={"/"}
            className="w-fit font-bold underline decoration-orange decoration-2"
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
