import type { ReactNode } from "react";

const PublicLayout = ({ children }: { children: ReactNode }) => (
  <main className="flex-1">{children}</main>
);

export default PublicLayout;
