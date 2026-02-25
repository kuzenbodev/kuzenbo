import type { CardProps } from "./card";

import { useComponentDefaultProps } from "../shared/size/size-provider";

export const useCardDefaultProps = (incomingProps: CardProps): CardProps =>
  useComponentDefaultProps<CardProps>("Card", {}, incomingProps);
