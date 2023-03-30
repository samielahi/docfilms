import { useRef, useEffect, useState, useContext } from "react";
import { SearchContext } from "./SearchContext";

export default function useKeyboardNavigation() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const resultsRef = useRef<HTMLDivElement | null>(null);
  const {} = useContext(SearchContext);

  useEffect(() => {}, [inputRef.current]);

  return { inputRef, resultsRef };
}
