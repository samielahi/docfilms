import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function useLoading() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function handleStart(url: string) {
      if (url !== router.asPath) {
        setLoading(true);
      }
    }

    function handleComplete(url: string) {
      if (url === router.asPath) {
        setLoading(false);
      }
    }

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });

  return loading;
}
