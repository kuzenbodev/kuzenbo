import { Typography } from "@kuzenbo/core";

const TOC_MOCK_ITEMS = [
  "Overview",
  "Usage",
  "Examples",
  "Accessibility",
  "API notes",
  "Related docs",
] as const;

export const DocsTocMock = () => (
  <div>
    <Typography.Small className="text-sm font-semibold">
      Table of contents
    </Typography.Small>
    <Typography.Muted className="mt-1 text-xs">
      Mock ToC for now. Real ToC component will replace this block.
    </Typography.Muted>
    <ul className="mt-3 m-0 grid list-none gap-1 p-0">
      {TOC_MOCK_ITEMS.map((item, index) => (
        <li key={item}>
          <Typography.Small
            className={
              index === 0
                ? "rounded-md bg-muted px-2 py-1 "
                : "px-2 py-1 text-muted-foreground"
            }
          >
            {item}
          </Typography.Small>
        </li>
      ))}
    </ul>
  </div>
);
