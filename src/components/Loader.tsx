import useLoading from "~/hooks/useLoading";
import type { ReactElement } from "react";

type Props = {
  children?: ReactElement;
};

export default function Loader({ children }: Props) {
  const loading = useLoading();

  return (
    <>
      {loading ? (
        <div className="flex h-screen w-screen items-center justify-center">
          <p className="font-bold">Loading...</p>
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
}
