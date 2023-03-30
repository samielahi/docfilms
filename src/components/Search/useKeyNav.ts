import { useRef, useEffect, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";
import { DocMovieSearchIndexResult } from "~/hooks/useFlexSearch";

export default function useKeyNav(
  currentQuery: string,
  searchResults: DocMovieSearchIndexResult[],
  selectedResult: number,
  setSelectedResult: Dispatch<SetStateAction<number>>
) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const resultsRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  function handleSearchResultKeyEvents(e: KeyboardEvent) {
    const key = e.key;

    switch (key) {
      case "ArrowDown":
        if (selectedResult === searchResults.length - 1) {
          setSelectedResult(-1);
          inputRef.current?.focus();
        } else {
          setSelectedResult(selectedResult + 1);
        }
        break;
      case "ArrowUp":
        if (!selectedResult) {
          setSelectedResult(-1);
          inputRef.current?.focus();
        } else {
          setSelectedResult(selectedResult - 1);
        }
        break;
      case "Enter":
        const movie = searchResults[selectedResult]!;
        router.push(`/movies/${movie.title}?year=${movie.year}`);
        break;
      default:
        break;
    }
  }

  function handleSearchInputKeyEvents(e: KeyboardEvent) {
    const key = e.key;

    switch (key) {
      case "ArrowDown":
        setSelectedResult!(0);
        resultsRef.current!.focus();
        break;
      case "ArrowUp":
        setSelectedResult!(searchResults.length - 1);
        resultsRef.current!.focus();
        break;
      case "Enter":
        router.push(`/search?q=${currentQuery}`);
        break;
      default:
        break;
    }
  }

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
    resultsRef.current?.addEventListener("keydown", handleSearchResultKeyEvents);

    return () => {
      resultsRef.current?.removeEventListener(
        "keydown",
        handleSearchResultKeyEvents
      );
    };
  }, [resultsRef.current, handleSearchResultKeyEvents]);

  return { inputRef, resultsRef };
}
