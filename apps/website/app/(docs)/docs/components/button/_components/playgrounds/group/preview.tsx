"use client";

import { Button } from "@kuzenbo/core/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@kuzenbo/core/ui/button-group";

import {
  resolveButtonGroupOrientation,
  resolveButtonGroupSize,
  resolveButtonVariant,
} from "../shared/button-playground-utils";
import type { State } from "./controls";

export const Preview = ({
  orientation,
  showSeparator,
  showStatus,
  size,
  variant,
}: State) => {
  const resolvedOrientation = resolveButtonGroupOrientation(orientation);
  const resolvedSeparatorOrientation =
    resolvedOrientation === "vertical" ? "horizontal" : "vertical";
  const resolvedSize = resolveButtonGroupSize(size);
  const resolvedVariant = resolveButtonVariant(variant, "outline");

  return (
    <ButtonGroup
      aria-label="Grouped actions"
      orientation={resolvedOrientation}
      role="group"
      size={resolvedSize}
    >
      <Button variant={resolvedVariant}>Undo</Button>
      {showSeparator ? (
        <ButtonGroupSeparator orientation={resolvedSeparatorOrientation} />
      ) : null}
      <Button variant={resolvedVariant}>Redo</Button>
      {showStatus ? (
        <ButtonGroupText render={<div />}>Auto-save enabled</ButtonGroupText>
      ) : null}
    </ButtonGroup>
  );
};
