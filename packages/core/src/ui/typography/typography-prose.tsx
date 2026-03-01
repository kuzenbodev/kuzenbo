import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn, tv } from "tailwind-variants";

const typographyProseVariants = tv({
  base: "text-foreground [&_mark]:bg-muted [&_mark]:text-foreground [&_a]:cursor-clickable [&_a]:text-muted-foreground [&_a:hover]:text-foreground [&_hr]:border-border [&_pre]:border-border [&_pre]:bg-muted [&_code]:bg-muted [&_kbd]:border-border [&_kbd]:bg-muted [&_kbd]:text-foreground [&_caption]:text-muted-foreground [&_th]:border-border [&_tfoot_th]:border-border [&_td]:border-border [&_blockquote]:border-border [&_blockquote]:bg-muted w-full max-w-[var(--kb-typography-prose-max-width,100%)] [&_a]:underline [&_a]:underline-offset-4 [&_a]:transition-colors [&_blockquote]:my-4 [&_blockquote]:rounded-md [&_blockquote]:border-l-2 [&_blockquote]:px-4 [&_blockquote]:py-3 [&_blockquote]:text-lg [&_blockquote]:text-[length:var(--kb-typography-prose-blockquote-size,1.125rem)] [&_blockquote]:leading-7 [&_blockquote]:leading-[var(--kb-typography-prose-blockquote-line-height,1.75rem)] [&_caption]:mt-2 [&_caption]:text-sm [&_caption]:text-[length:var(--kb-typography-text-muted-size,0.875rem)] [&_code]:rounded-sm [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm [&_code]:text-[length:var(--kb-typography-prose-inline-code-size,0.875rem)] [&_h1]:mt-10 [&_h1]:mb-3 [&_h1]:text-4xl [&_h1]:text-[length:var(--kb-typography-heading-h1-size,2.25rem)] [&_h1]:leading-[var(--kb-typography-heading-h1-line-height,2.8125rem)] [&_h1]:leading-tight [&_h1]:font-semibold [&_h1]:tracking-tight [&_h1]:text-balance [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-3xl [&_h2]:text-[length:var(--kb-typography-heading-h2-size,1.875rem)] [&_h2]:leading-[var(--kb-typography-heading-h2-line-height,2.34375rem)] [&_h2]:leading-tight [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-balance [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-2xl [&_h3]:text-[length:var(--kb-typography-heading-h3-size,1.5rem)] [&_h3]:leading-[var(--kb-typography-heading-h3-line-height,2.0625rem)] [&_h3]:leading-snug [&_h3]:font-semibold [&_h3]:tracking-tight [&_h4]:mt-6 [&_h4]:mb-2 [&_h4]:text-xl [&_h4]:text-[length:var(--kb-typography-heading-h4-size,1.25rem)] [&_h4]:leading-[var(--kb-typography-heading-h4-line-height,1.71875rem)] [&_h4]:leading-snug [&_h4]:font-semibold [&_h4]:tracking-tight [&_h5]:mt-4 [&_h5]:mb-2 [&_h5]:text-lg [&_h5]:text-[length:var(--kb-typography-heading-h5-size,1.125rem)] [&_h5]:leading-7 [&_h5]:leading-[var(--kb-typography-heading-h5-line-height,1.75rem)] [&_h5]:font-semibold [&_h5]:tracking-tight [&_h6]:mt-4 [&_h6]:mb-2 [&_h6]:text-base [&_h6]:text-[length:var(--kb-typography-heading-h6-size,1rem)] [&_h6]:leading-6 [&_h6]:leading-[var(--kb-typography-heading-h6-line-height,1.5rem)] [&_h6]:font-semibold [&_h6]:tracking-tight [&_hr]:my-4 [&_hr]:border-0 [&_hr]:border-t [&_img]:mb-2 [&_img]:max-w-full [&_kbd]:inline-flex [&_kbd]:h-5 [&_kbd]:min-w-5 [&_kbd]:items-center [&_kbd]:justify-center [&_kbd]:rounded-sm [&_kbd]:border [&_kbd]:px-1 [&_kbd]:font-mono [&_kbd]:text-xs [&_kbd]:font-medium [&_li]:mt-1 [&_mark]:rounded-[2px] [&_mark]:px-1 [&_ol:not([data-type='taskList'])]:mb-4 [&_ol:not([data-type='taskList'])]:list-decimal [&_ol:not([data-type='taskList'])]:pl-6 [&_ol:not([data-type='taskList'])]:text-base [&_ol:not([data-type='taskList'])]:text-[length:var(--kb-typography-text-body-size,1rem)] [&_ol:not([data-type='taskList'])]:leading-7 [&_ol:not([data-type='taskList'])]:leading-[var(--kb-typography-text-body-line-height,1.75rem)] [&_p]:mt-0 [&_p]:mb-6 [&_p]:mb-[var(--kb-typography-prose-paragraph-margin-bottom,1.5rem)] [&_p]:text-base [&_p]:text-[length:var(--kb-typography-text-body-size,1rem)] [&_p]:leading-7 [&_p]:leading-[var(--kb-typography-text-body-line-height,1.75rem)] [&_pre]:my-4 [&_pre]:overflow-x-auto [&_pre]:rounded-md [&_pre]:border [&_pre]:px-3 [&_pre]:py-2 [&_pre]:font-mono [&_pre]:text-sm [&_pre]:text-[length:var(--kb-typography-prose-code-size,0.875rem)] [&_pre]:leading-6 [&_pre]:leading-[var(--kb-typography-prose-code-line-height,1.5rem)] [&_pre_code]:border-0 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-inherit [&_table]:mb-4 [&_table]:w-full [&_table]:caption-bottom [&_table]:border-collapse [&_table]:text-sm [&_tbody_tr:last-child_td]:border-b-0 [&_td]:border-b [&_td]:px-2 [&_td]:py-2 [&_tfoot_th]:border-t [&_th]:border-b [&_th]:px-2 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_ul:not([data-type='taskList'])]:mb-4 [&_ul:not([data-type='taskList'])]:list-disc [&_ul:not([data-type='taskList'])]:pl-6 [&_ul:not([data-type='taskList'])]:text-base [&_ul:not([data-type='taskList'])]:text-[length:var(--kb-typography-text-body-size,1rem)] [&_ul:not([data-type='taskList'])]:leading-7 [&_ul:not([data-type='taskList'])]:leading-[var(--kb-typography-text-body-line-height,1.75rem)] [&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
});

export type TypographyProseProps = useRender.ComponentProps<"div">;

const TypographyProse = ({
  className,
  render,
  ...props
}: TypographyProseProps) =>
  useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(typographyProseVariants(), className),
      },
      props
    ),
    render,
    state: {
      slot: "typography-prose",
    },
  });

export { TypographyProse, typographyProseVariants };
