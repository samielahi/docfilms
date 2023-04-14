import Logo from "./Logo";
// import Search from "./Search/Search";
import { useState, useEffect } from "react";
import useViewportWidth from "~/hooks/useViewportWidth";

export default function Header() {
  // const [showSearchBar, setShowSearchBar] = useState(false);
  // const currentWidth = useViewportWidth();
  // const breakpoint = 768; // TailwindCSS 'md' breakpoint width

  // If we pass the breakpoint revert back to normal
  // useEffect(() => {
  //   if (currentWidth > breakpoint && showSearchBar) {
  //     setShowSearchBar(false);
  //   }
  // }, [currentWidth]);

  return (
    <header className="wrapper relative flex justify-between py-10">
      <Logo size="small" />
    </header>
  );
}
