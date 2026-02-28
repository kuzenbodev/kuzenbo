"use client";

import {
  Alert01Icon,
  Copy01Icon,
  Loading03Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import type { HugeiconsProps } from "@hugeicons/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { useClipboard } from "@kuzenbo/hooks/use-clipboard";
import type { ComponentProps, ReactNode } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "tailwind-variants";

import { Button } from "../button/button";

export type CopyButtonStatus = "idle" | "copying" | "copied" | "failed";

type CopyButtonStatusMap = Record<CopyButtonStatus, string>;

type CopyButtonContent = ReactNode | ((status: CopyButtonStatus) => ReactNode);

const DEFAULT_TIMEOUT = 1200;

const STATUS_ORDER: CopyButtonStatus[] = [
  "idle",
  "copying",
  "copied",
  "failed",
];

const STATUS_LABELS: CopyButtonStatusMap = {
  copied: "Copied",
  copying: "Copying",
  failed: "Copy failed",
  idle: "Copy",
};

const STATUS_LIVE_MESSAGES: CopyButtonStatusMap = {
  copied: "Copied to clipboard",
  copying: "Copying to clipboard",
  failed: "Failed to copy to clipboard",
  idle: "Ready to copy to clipboard",
};

const STATUS_ICON_BY_STATUS = {
  copied: Tick02Icon,
  copying: Loading03Icon,
  failed: Alert01Icon,
  idle: Copy01Icon,
} as const satisfies Record<
  CopyButtonStatus,
  NonNullable<HugeiconsProps["icon"]>
>;

export type CopyButtonProps = Omit<
  ComponentProps<typeof Button>,
  "aria-pressed" | "children" | "isLoading" | "onClick"
> & {
  value: string;
  timeout?: number;
  status?: CopyButtonStatus;
  defaultStatus?: CopyButtonStatus;
  onStatusChange?: (status: CopyButtonStatus) => void;
  statusLabels?: Partial<CopyButtonStatusMap>;
  liveRegionMessages?: Partial<CopyButtonStatusMap>;
  children?: CopyButtonContent;
  onClick?: ComponentProps<typeof Button>["onClick"];
};

const resolveContent = (
  content: CopyButtonContent | undefined,
  status: CopyButtonStatus
) => {
  if (typeof content === "function") {
    return content(status);
  }

  return content;
};

const CopyButton = ({
  className,
  value,
  timeout = DEFAULT_TIMEOUT,
  status,
  defaultStatus = "idle",
  onStatusChange,
  statusLabels,
  liveRegionMessages,
  children,
  disabled,
  onClick,
  type = "button",
  "aria-label": ariaLabel,
  ...props
}: CopyButtonProps) => {
  const clipboard = useClipboard({ timeout });
  const [internalStatus, setInternalStatus] =
    useState<CopyButtonStatus>(defaultStatus);
  const isControlled = status !== undefined;
  const currentStatus = status ?? internalStatus;
  const currentStatusRef = useRef(currentStatus);
  const hasMountedRef = useRef(false);

  const mergedStatusLabels = useMemo<CopyButtonStatusMap>(
    () => ({ ...STATUS_LABELS, ...statusLabels }),
    [statusLabels]
  );

  const mergedLiveMessages = useMemo<CopyButtonStatusMap>(
    () => ({ ...STATUS_LIVE_MESSAGES, ...liveRegionMessages }),
    [liveRegionMessages]
  );

  const setStatus = useCallback(
    (nextStatus: CopyButtonStatus) => {
      if (currentStatusRef.current === nextStatus) {
        return;
      }

      currentStatusRef.current = nextStatus;

      if (!isControlled) {
        setInternalStatus(nextStatus);
      }

      onStatusChange?.(nextStatus);
    },
    [isControlled, onStatusChange]
  );

  const handleClick = useCallback<NonNullable<CopyButtonProps["onClick"]>>(
    (event) => {
      onClick?.(event);

      if (event.defaultPrevented || disabled) {
        return;
      }

      clipboard.reset();
      setStatus("copying");
      clipboard.copy(value);
    },
    [clipboard, disabled, onClick, setStatus, value]
  );

  useEffect(() => {
    currentStatusRef.current = currentStatus;
  }, [currentStatus]);

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    if (clipboard.error) {
      setStatus("failed");
      return;
    }

    if (clipboard.copied) {
      setStatus("copied");
      return;
    }

    if (currentStatusRef.current === "copied") {
      setStatus("idle");
    }
  }, [clipboard.copied, clipboard.error, setStatus]);

  useEffect(() => {
    if (currentStatus !== "failed") {
      return;
    }

    const failedResetTimeout = window.setTimeout(() => {
      setStatus("idle");
    }, timeout);

    return () => {
      window.clearTimeout(failedResetTimeout);
    };
  }, [currentStatus, setStatus, timeout]);

  const resolvedContent = resolveContent(children, currentStatus);
  const visibleLabel = resolvedContent ?? mergedStatusLabels[currentStatus];
  const liveRegionText =
    liveRegionMessages?.[currentStatus] ?? mergedLiveMessages[currentStatus];
  const resolvedAriaLabel =
    ariaLabel ?? (visibleLabel ? undefined : mergedStatusLabels[currentStatus]);

  return (
    <>
      <Button
        aria-label={resolvedAriaLabel}
        className={cn("cursor-clickable gap-2", className)}
        data-slot="copy-button"
        data-status={currentStatus}
        disabled={disabled || currentStatus === "copying"}
        onClick={handleClick}
        type={type}
        {...props}
      >
        <span className="inline-flex items-center gap-2">
          <span
            aria-hidden="true"
            className="relative inline-flex size-4 items-center justify-center"
          >
            {STATUS_ORDER.map((iconStatus) => (
              <HugeiconsIcon
                key={iconStatus}
                className={cn(
                  "absolute inset-0 size-4 transition-opacity duration-150 ease-out motion-reduce:transition-none",
                  iconStatus === currentStatus ? "opacity-100" : "opacity-0",
                  iconStatus === "copying" &&
                    "data-[active=true]:animate-spin motion-reduce:data-[active=true]:animate-none",
                  iconStatus === "copied" && "text-success",
                  iconStatus === "failed" && "text-danger",
                  iconStatus === "idle" && "text-muted-foreground"
                )}
                data-active={iconStatus === currentStatus}
                data-status-icon={iconStatus}
                icon={STATUS_ICON_BY_STATUS[iconStatus]}
                strokeWidth={2}
              />
            ))}
          </span>
          {visibleLabel ? (
            <span className="transition-opacity duration-150 ease-out motion-reduce:transition-none">
              {visibleLabel}
            </span>
          ) : null}
        </span>
      </Button>
      <span
        aria-atomic="true"
        aria-live={currentStatus === "failed" ? "assertive" : "polite"}
        className="sr-only"
        role="status"
      >
        {liveRegionText}
      </span>
    </>
  );
};

export { CopyButton };
