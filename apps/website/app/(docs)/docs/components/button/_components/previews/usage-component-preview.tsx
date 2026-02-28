"use client";

import { Button } from "@kuzenbo/core/ui/button";

import { ComponentPreview } from "../component-preview";

const USAGE_CODE = `import { Button } from "@kuzenbo/core/ui/button";

export function Demo() {
  return <Button type="submit">Save changes</Button>;
}
`;

export const ButtonUsageComponentPreview = () => (
  <ComponentPreview
    code={USAGE_CODE}
    preview={<Button type="submit">Save changes</Button>}
  />
);
