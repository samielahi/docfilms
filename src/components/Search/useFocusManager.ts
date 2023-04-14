import type { Dispatch, SetStateAction } from "react";
import { useCallback, useState, useEffect } from "react";
import {
  useSearch,
  useSearchDispatch,
} from "~/components/Search/SearchContext";

export type FocusIndex = number | null;

export const useFocusManager = (
  listSize: number,
  initialFocus: FocusIndex
): [FocusIndex, Dispatch<SetStateAction<FocusIndex>>] => {
  // Track which results is currently focused
  const [currentFocus, setCurrentFocus] = useState<FocusIndex>(initialFocus);
  const { inputRef } = useSearch()!;
  const dispatch = useSearchDispatch()!;

  const handleKeyDown = useCallback<(event: KeyboardEvent) => void>(
    (event) => {
      switch (event.key) {
        // Handle cycling up or down through the list, wrapping if necessary.
        case "ArrowDown":
          event.preventDefault();
          setCurrentFocus(
            currentFocus === null
              ? 0
              : currentFocus === listSize - 1
              ? 0
              : currentFocus + 1
          );
          break;
        case "ArrowUp":
          event.preventDefault();
          setCurrentFocus(
            currentFocus === null
              ? listSize - 1
              : currentFocus === 0
              ? listSize - 1
              : currentFocus - 1
          );
          break;
        // Reset focus and hide results on Escape
        case "Escape":
          event.preventDefault();
          setCurrentFocus(null);
          dispatch({
            type: "HIDE_RESULTS",
          });
          break;
        // Focus search bar on Escape
        case "/":
          event.preventDefault();
          if (document.activeElement !== inputRef.current) {
            setCurrentFocus(null);
            inputRef.current?.focus();
          }
          break;
        case "Tab":
          dispatch({
            type: "HIDE_RESULTS",
          });
          setCurrentFocus(null);
          break;
      }
    },
    [listSize, currentFocus, setCurrentFocus, dispatch, inputRef]
  );

  // If user clicks outside of the search area, hide the search results
  const handleOutsideClick = useCallback<(event: MouseEvent) => void>(
    (event) => {
      const target = event.target;

      if (target !== inputRef.current) {
        setCurrentFocus(null);
        dispatch({
          type: "HIDE_RESULTS",
        });
      }
    },
    [inputRef, dispatch]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, false);
    document.addEventListener("click", handleOutsideClick, false);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, false);
      document.removeEventListener("click", handleOutsideClick, false);
    };
  }, [handleKeyDown, handleOutsideClick]);

  return [currentFocus, setCurrentFocus];
};
