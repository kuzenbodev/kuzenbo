import type { Route } from "next";

import { Typography } from "@kuzenbo/core/ui/typography";
import Link from "next/link";

import type { FooterColumn } from "./footer.types";

interface FooterNavigationColumnProps {
  column: FooterColumn;
}

export const FooterNavigationColumn = ({
  column,
}: FooterNavigationColumnProps) => (
  <nav aria-label={`${column.title} links`}>
    <Typography.Small className="mb-3 block font-medium ">
      {column.title}
    </Typography.Small>
    <ul className="m-0 list-none space-y-2 p-0">
      {column.links.map((item) => (
        <li key={item.href}>
          <Typography.Link render={<Link href={item.href as Route} />}>
            {item.label}
          </Typography.Link>
        </li>
      ))}
    </ul>
  </nav>
);
