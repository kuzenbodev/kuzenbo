import { Container, Typography } from "@kuzenbo/core";

import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Page Not Found",
  description: "The requested page could not be found.",
  canonicalPath: "/",
  noIndex: true,
});

export default function NotFound() {
  return (
    <main className="min-h-screen  ">
      <Container className="py-16">
        <Typography.H1>Page not found</Typography.H1>
        <Typography.Muted className="mt-3">
          The page you are looking for does not exist.
        </Typography.Muted>
      </Container>
    </main>
  );
}
