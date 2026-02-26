export const template = `import { Button } from "@kuzenbo/core/ui/button";

export function Demo() {
  return (
    <Button
      {{props}}
    >
      {{children}}
    </Button>
  );
}
`;
