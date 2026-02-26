import { Container } from "@kuzenbo/core/ui/container";
import { Typography } from "@kuzenbo/core/ui/typography";

export default function NotFound() {
  return (
    <main className="min-h-screen">
      <Container className="py-16">
        <Typography.H1>Page not found</Typography.H1>
        <Typography.Muted className="mt-3">
          The page you are looking for does not exist.
        </Typography.Muted>
      </Container>
    </main>
  );
}
