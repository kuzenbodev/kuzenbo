import { Typography } from "@kuzenbo/core/ui/typography";

export const FooterBrand = () => (
  <div className="space-y-4">
    <Typography.H5>Kuzenbo</Typography.H5>
    <Typography.Muted className="max-w-sm text-sm">
      Composable React primitives and polished components for building design
      systems without losing flexibility.
    </Typography.Muted>
    <Typography.Small className="text-muted-foreground text-sm">
      Jump into docs, browse examples, and ship consistent interfaces faster.
    </Typography.Small>
  </div>
);
