export const template = `import { SearchIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@kuzenbo/core/ui/button";

export function Demo() {
  return (
    <Button
      aria-label="Search"
      {{props}}
    >
      <HugeiconsIcon icon={SearchIcon} />
    </Button>
  );
}
`;
