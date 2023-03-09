import { useRef } from "react";
import type { Callback } from "~/types";

function useDebouncedFn<I, O>(callback: Callback<I, O>, waitMS = 250) {
  const timeoutIdRef = useRef<string | number | NodeJS.Timeout | undefined>();

  return function (this: Callback<I, O> | void, ...args: I[]) {
    clearTimeout(timeoutIdRef.current);

    timeoutIdRef.current = setTimeout(() => {
      timeoutIdRef.current = undefined;
      callback.call(this, ...args);
    }, waitMS);
  };
}

export default useDebouncedFn;
