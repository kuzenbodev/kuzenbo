import { Typography } from "@kuzenbo/core/ui/typography";

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
    <ul className="m-0 mt-3 grid list-none gap-1 p-0">
      {TOC_MOCK_ITEMS.map((item, index) => (
        <li key={item}>
          <Typography.Small
            className={
              index === 0
                ? "bg-muted rounded-md px-2 py-1"
                : "text-muted-foreground px-2 py-1"
            }
          >
            {item}
          </Typography.Small>
        </li>
      ))}
    </ul>
  </div>
);
