import useLoading from "~/hooks/useLoading";
import { AnimatePresence, motion } from "framer-motion";
import Icon from "./Icon";
import type { ReactElement } from "react";

type Props = {
  children?: ReactElement;
};

export default function Loader({ children }: Props) {
  const loading = useLoading();

  return (
    <>
      <AnimatePresence>
        {loading ? (
          <motion.div
            transition={{ duration: 0.7 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex h-screen w-screen items-center justify-center gap-4"
          >
            <div className="flex gap-4">
              <div className="h-fit w-fit origin-center animate-spin">
                <Icon name="loader" />
              </div>
              <p className="font-bold">Loading...</p>
            </div>
          </motion.div>
        ) : (
          <>{children}</>
        )}
      </AnimatePresence>
    </>
  );
}
