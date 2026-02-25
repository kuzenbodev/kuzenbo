import { createContext, useContext } from "react";

export const createStrictContext = <T>(errorMessage: string) => {
  const StrictContext = createContext<T | null>(null);

  const useStrictContext = (): T => {
    const context = useContext(StrictContext);

    if (!context) {
      throw new Error(errorMessage);
    }

    return context;
  };

  const useOptionalContext = (): T | null => useContext(StrictContext);

  return {
    StrictContext,
    useOptionalContext,
    useStrictContext,
  };
};
