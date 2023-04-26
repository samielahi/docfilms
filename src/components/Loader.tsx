import useLoading from "~/hooks/useLoading";
import Logo from "./Logo";
import type { ReactElement } from "react";

type Props = {
  children?: ReactElement;
};

export default function Loader({ children }: Props) {
  const loading = useLoading();

  return (
    <>
      {loading ? (
        <div className="flex h-screen w-screen flex-col items-center justify-center gap-2">
          <Logo size="small" />
          <p className="font-bold">Loading...</p>
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
}
