import Logo from "./Logo";

export default function Header() {
  return (
    <header className="wrapper flex justify-between py-10">
      <Logo size="small" />
      <div className="flex items-center gap-4">
        <input
          className="mr-2"
          type="checkbox"
          name="dark-mode"
          id="dark-mode"
        />
        <label className="font-bold" htmlFor="dark-mode">
          dark mode
        </label>
      </div>
    </header>
  );
}
