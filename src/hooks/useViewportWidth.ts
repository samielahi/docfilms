import { useState, useEffect } from "react";

export default function useViewportWidth() {
  function getWidth() {
    if (typeof window !== "undefined") {
      return (
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth
      );
    }
  }
  const [width, setWidth] = useState(getWidth());

  useEffect(() => {
    // TimeoutId for debounce mechanism
    let timeoutId: NodeJS.Timeout | null = null;
    const resizeListener = () => {
      // Prevent execution of previous setTimeout
      clearTimeout(timeoutId!);
      // Change width from the state object after 150ms
      timeoutId = setTimeout(() => setWidth(getWidth()), 150);
    };
    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  return width;
}
