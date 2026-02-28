import { Typography } from "@kuzenbo/core/ui/typography";
import Link from "next/link";

export const FooterBottom = () => (
  <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
    <Typography.Muted className="text-xs">Kuzenbo.</Typography.Muted>
    <Typography.Link className="w-fit text-xs" render={<Link href="/docs" />}>
      Start building with Kuzenbo
    </Typography.Link>
  </div>
);
