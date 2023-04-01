import Logo from "./Logo";
import Search from "./Search/Search";

export default function Header() {
  return (
    <header className="wrapper relative py-10 flex">
      <Logo size="small" />
      <div className="absolute left-[calc(100%_-_350px)]">
        <Search size="mini" />
      </div>
    </header>
  );
}
