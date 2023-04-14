import { useEffect, useRef } from "react";

export default function useFocus<T extends HTMLElement>(shouldFocus: boolean) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (ref && ref.current !== document.activeElement && shouldFocus) {
      ref.current?.focus();
    }
  }, [shouldFocus, ref]);

  return ref;
}
