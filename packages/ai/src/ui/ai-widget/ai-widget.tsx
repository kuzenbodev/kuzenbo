"use client";

import type { ComponentProps } from "react";

import { cn, tv } from "tailwind-variants";

export type AiWidgetProps = ComponentProps<"section"> & {
  title?: string;
};

const aiWidgetVariants = tv({
  slots: {
    root: "rounded-lg border border-border bg-card p-4 text-card-foreground",
    title: "text-sm font-medium",
    content: "mt-2 text-sm text-muted-foreground",
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
