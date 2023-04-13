import { useEffect, useRef } from "react";

export default function useFocus(shouldFocus: boolean) {
  const ref = useRef<HTMLLIElement | HTMLInputElement>(null);

  useEffect(() => {
    if (ref && ref.current !== document.activeElement && shouldFocus) {
      ref.current?.focus();
    }
  }, [shouldFocus, ref]);

  return ref;
}
