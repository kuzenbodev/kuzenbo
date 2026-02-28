export const template = `import { Button } from "@kuzenbo/core/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@kuzenbo/core/ui/button-group";

type DemoProps = {
  orientation?: "horizontal" | "vertical";
  showSeparator?: boolean;
  showStatus?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "default" | "outline" | "secondary" | "ghost" | "danger";
};

function GroupPreview({
  orientation = "horizontal",
  showSeparator = true,
  showStatus = true,
  size = "md",
  variant = "outline",
}: DemoProps) {
  const separatorOrientation =
    orientation === "vertical" ? "horizontal" : "vertical";

  return (
    <ButtonGroup aria-label="Grouped actions" orientation={orientation} role="group" size={size}>
      <Button variant={variant}>Undo</Button>
      {showSeparator ? <ButtonGroupSeparator orientation={separatorOrientation} /> : null}
      <Button variant={variant}>Redo</Button>
      {showStatus ? <ButtonGroupText render={<div />}>Auto-save enabled</ButtonGroupText> : null}
    </ButtonGroup>
  );
}

export function Demo() {
  return <GroupPreview {{props}} />;
}
`;
