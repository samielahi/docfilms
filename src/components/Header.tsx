import Logo from "./Logo";
import Search from "./Search/Search";

export default function Header() {
  return (
    <header className="wrapper relative flex py-10">
      <Logo size="small" />
      <div className="absolute left-[calc(100%_-_275px)] hidden sm:left-[calc(100%_-_350px)] sm:block">
        <Search size="mini" />
      </div>
    </header>
  );
}
