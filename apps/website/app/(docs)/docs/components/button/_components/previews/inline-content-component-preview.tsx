"use client";

import {
  Add01Icon,
  ArrowRight01Icon,
  SearchIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@kuzenbo/core/ui/button";

import { ComponentPreview } from "../component-preview";

const INLINE_CONTENT_CODE = `import {
  Add01Icon,
  ArrowRight01Icon,
  SearchIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@kuzenbo/core/ui/button";

export function Demo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="outline">
        <HugeiconsIcon icon={SearchIcon} />
        Find record
      </Button>

      <Button>
        Add member
        <HugeiconsIcon icon={Add01Icon} />
      </Button>

      <Button variant="secondary">
        <HugeiconsIcon icon={SearchIcon} />
        Open details
        <HugeiconsIcon icon={ArrowRight01Icon} />
      </Button>
    </div>
  );
}
`;

export const ButtonInlineContentComponentPreview = () => (
  <ComponentPreview
    code={INLINE_CONTENT_CODE}
    preview={
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button variant="outline">
          <HugeiconsIcon icon={SearchIcon} />
          Find record
        </Button>

        <Button>
          Add member
          <HugeiconsIcon icon={Add01Icon} />
        </Button>

        <Button variant="secondary">
          <HugeiconsIcon icon={SearchIcon} />
          Open details
          <HugeiconsIcon icon={ArrowRight01Icon} />
        </Button>
      </div>
    }
    previewClassName="min-h-28"
  />
);
