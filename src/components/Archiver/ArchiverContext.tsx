import { createContext, useContext, useReducer } from "react";
import { Section } from "./types";
import type { ReactNode, Dispatch } from "react";
import type { ArchiverSession, ArchiverAction } from "./types";

export const ArchiverContext = createContext<ArchiverSession | null>(null);
export const ArchiverDispatchContext =
  createContext<Dispatch<ArchiverAction> | null>(null);

type Props = {
  children: ReactNode;
};

export function ArchiverProvider({ children }: Props) {
  const initialState: ArchiverSession = {
    rows: [],
    currentSection: Section.upload,
  };

  const [state, dispatch] = useReducer(archiverReducer, initialState);

  return (
    <>
      <ArchiverContext.Provider value={state}>
        <ArchiverDispatchContext.Provider value={dispatch}>
          {children}
        </ArchiverDispatchContext.Provider>
      </ArchiverContext.Provider>
    </>
  );
}

function archiverReducer(state: ArchiverSession, action: ArchiverAction) {
  switch (action.type) {
    case "LOAD_CSV":
      return (({ csvString, ...rest }) => ({
        csvString: action.value,
        ...rest,
      }))(state);
    case "SET_ROWS":
      return (({ rows, ...rest }) => ({
        rows: action.value,
        ...rest,
      }))(state);
    case "ADVANCE":
      return (({ currentSection: currentSection, ...rest }) => ({
        currentSection: Section.next(currentSection!),
        ...rest,
      }))(state);
    case "BACK":
      return (({ currentSection: currentSection, ...rest }) => ({
        currentSection: Section.prev(currentSection!),
        ...rest,
      }))(state);
  }
}

export function useArchiver() {
  return useContext(ArchiverContext);
}

export function useArchiverDispatch() {
  return useContext(ArchiverDispatchContext);
}
