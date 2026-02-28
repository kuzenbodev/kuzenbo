import { useComponentDefaultProps } from "../shared/size/size-provider";
import type { CardProps } from "./card";

export const useCardDefaultProps = (incomingProps: CardProps): CardProps =>
  useComponentDefaultProps<CardProps>("Card", {}, incomingProps);
