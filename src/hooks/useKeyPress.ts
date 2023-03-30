import { MutableRefObject, useEffect } from "react";

export function useKeyPress(
  targetRef: MutableRefObject<HTMLElement> | null,
  callback: () => void,
  pressedKey: string
): void {
  function handler({ key }: KeyboardEvent) {
    if (key === pressedKey) {
      callback();
    }
  }

  useEffect(() => {
    targetRef?.current.addEventListener("keydown", handler);

    return () => {
      targetRef?.current.removeEventListener("keydown", handler);
    };
  }, [targetRef?.current]);
}
