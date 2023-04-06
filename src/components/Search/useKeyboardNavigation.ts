import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { DocSearchIndexResult } from "~/hooks/useFlexSearch";

export default function useKeyboardNavigation(
  currentQuery: string,
  searchResults: DocSearchIndexResult[]
) {
  const [selectedResult, setSelectedResult] = useState(-1);
  const [showResults, setShowResults] = useState(true);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const resultsRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  function handleSearchResultKeyEvents(e: KeyboardEvent) {
    const key = e.key;

    switch (key) {
      case "ArrowDown":
        e.preventDefault();
        if (selectedResult === searchResults.length - 1) {
          setSelectedResult(9999);
          inputRef.current?.focus();
        } else {
          setSelectedResult(selectedResult + 1);
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        if (!selectedResult) {
          setSelectedResult(9999);
          inputRef.current?.focus();
        } else {
          setSelectedResult(selectedResult - 1);
        }
        break;
      case "Enter":
        const result = searchResults[selectedResult]!;
        if (result.type === "movie") {
          router.push(
            `/movies/${result.title.replaceAll(" ", "-")}?year=${result.year}`
          );
        } else if (result.type === "director") {
          router.push(`/director/${result.director}`);
        } else {
          router.push(`/quarter/${result.quarter}`);
        }
        break;
      case "Escape":
        hideResults();
      default:
        break;
    }
  }

  function handleSearchInputKeyEvents(e: KeyboardEvent) {
    const key = e.key;
    setSelectedResult(9999);

    switch (key) {
      case "ArrowDown":
        e.preventDefault();
        setShowResults(true);
        setSelectedResult!(0);
        resultsRef.current!.focus();
        break;
      case "ArrowUp":
        e.preventDefault();
        setShowResults(true);
        setSelectedResult!(searchResults.length - 1);
        resultsRef.current!.focus();
        break;
      case "Enter":
        if (currentQuery.length) {
          router.push(`/search?q=${currentQuery}`);
        }
        break;
      case "Escape":
        hideResults();
        break;
      default:
        setShowResults(true);
        break;
    }
  }

  function hideResults() {
    if (showResults) {
      setSelectedResult(-1);
      setShowResults(false);
    }
  }

  useEffect(() => {
    function focusInput(event: KeyboardEvent) {
      const inputIsFocused = document.activeElement === inputRef.current;
      if (!inputIsFocused && event.key === "/") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    }

    function closeResultsOnClick({ target }: MouseEvent) {
      if (target !== inputRef.current || target !== resultsRef.current) {
        hideResults();
      }
    }

    window.addEventListener("keydown", focusInput);
    window.addEventListener("click", closeResultsOnClick);

    return () => {
      window.removeEventListener("keydown", focusInput);
      window.removeEventListener("click", closeResultsOnClick);
    };
  }, []);

  useEffect(() => {
    inputRef.current?.addEventListener("keydown", handleSearchInputKeyEvents);

    return () => {
      inputRef.current?.removeEventListener(
        "keydown",
        handleSearchInputKeyEvents
      );
    };
  }, [inputRef.current, handleSearchInputKeyEvents]);

  useEffect(() => {
    resultsRef.current?.addEventListener(
      "keydown",
      handleSearchResultKeyEvents
    );

    return () => {
      resultsRef.current?.removeEventListener(
        "keydown",
        handleSearchResultKeyEvents
      );
    };
  }, [resultsRef.current, handleSearchResultKeyEvents]);

  return { inputRef, resultsRef, showResults, selectedResult };
}
