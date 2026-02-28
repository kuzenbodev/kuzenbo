export const template = `import { SearchIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ActionIcon } from "@kuzenbo/core/ui/action-icon";

export function Demo() {
  return (
    <ActionIcon
      aria-label="Search"
      {{props}}
    >
      <HugeiconsIcon icon={SearchIcon} />
    </ActionIcon>
  );
}
`;
