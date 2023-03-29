import Logo from "./Logo";

export default function Header() {
  return (
    <header className="wrapper flex justify-between py-10">
      <Logo size="small" />
    </header>
  );
}
