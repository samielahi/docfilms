import Logo from "./Logo";
import Search from "./Search/Search";

export default function Header() {
  return (
    <header className="wrapper relative flex py-10">
      <Logo size="small" />
      <div className="absolute left-[calc(100%_-_300px)]">
        <Search size="mini" />
      </div>
    </header>
  );
}
