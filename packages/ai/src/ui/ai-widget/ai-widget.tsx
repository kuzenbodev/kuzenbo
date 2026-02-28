"use client";

import type { ComponentProps } from "react";
import { cn, tv } from "tailwind-variants";

export type AiWidgetProps = ComponentProps<"section"> & {
  title?: string;
};

const aiWidgetVariants = tv({
  slots: {
    root: "border-border bg-card text-card-foreground rounded-lg border p-4",
    title: "text-sm font-medium",
    content: "text-muted-foreground mt-2 text-sm",
  },
});

export const AiWidget = ({
  title = "AI Widget",
  className,
  children,
  ...props
}: AiWidgetProps) => {
  const styles = aiWidgetVariants();

  return (
    <section
      className={cn(styles.root(), className)}
      data-slot="ai-widget"
      {...props}
    >
      {/* @kuzenbo/ai cannot import core Typography due package boundary rules. */}
      <h3 className={styles.title()}>{title}</h3>
      <div className={styles.content()}>{children}</div>
    </section>
  );
};
