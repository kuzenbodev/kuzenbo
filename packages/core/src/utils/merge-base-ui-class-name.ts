import { cn } from "tailwind-variants";

export type BaseUIClassName<State> =
  | ((state: State) => string | undefined)
  | string
  | undefined;

export const mergeBaseUIClassName = <State>(
  baseClassName: string | undefined,
  className: BaseUIClassName<State>
): BaseUIClassName<State> => {
  if (typeof className === "function") {
    return (state) => cn(baseClassName, className(state));
  }
  return cn(baseClassName, className);
};
