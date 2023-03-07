import type { Callback } from "~/types";

function debounce<T, O>(callback: Callback<T, O>, waitMS = 250) {
  let timeoutId: string | number | NodeJS.Timeout | undefined;

  return function (this: Callback<T, O>, ...args: T[]) {
    clearTimeout(timeoutId);
    // Arrow function preserves 'this' scope from enclosing lexical context
    timeoutId = setTimeout(() => {
      timeoutId = undefined;
      callback.call(this, ...args);
    }, waitMS);
  };
}

export { debounce };
