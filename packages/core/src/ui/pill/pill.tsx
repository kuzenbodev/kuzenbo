"use client";

import type { ComponentProps } from "react";
import { cn } from "tailwind-variants";

import { Badge } from "../badge/badge";
import { PillAvatar } from "./pill-avatar";
import { PillAvatarGroup } from "./pill-avatar-group";
import { PillButton } from "./pill-button";
import { PillDelta } from "./pill-delta";
import { PillIcon } from "./pill-icon";
import { PillIndicator } from "./pill-indicator";
import { PillStatus } from "./pill-status";

export type PillProps = ComponentProps<typeof Badge>;

const Pill = ({ variant = "default", className, ...props }: PillProps) => (
  <Badge
    className={cn(
      "rounded-full font-normal data-[size=lg]:gap-2.5 data-[size=lg]:px-3.5 data-[size=lg]:py-1.5 data-[size=md]:gap-2 data-[size=md]:px-3 data-[size=md]:py-1.5 data-[size=sm]:gap-1.5 data-[size=sm]:px-2.5 data-[size=sm]:py-1 data-[size=xl]:gap-3 data-[size=xl]:px-4 data-[size=xl]:py-2 data-[size=xs]:gap-1 data-[size=xs]:px-2 data-[size=xs]:py-0.5",
      className
    )}
    variant={variant}
    {...props}
  />
);

Pill.Avatar = PillAvatar;
Pill.AvatarGroup = PillAvatarGroup;
Pill.Button = PillButton;
Pill.Delta = PillDelta;
Pill.Icon = PillIcon;
Pill.Indicator = PillIndicator;
Pill.Status = PillStatus;

export {
  Pill,
  PillAvatar,
  PillAvatarGroup,
  PillButton,
  PillDelta,
  PillIcon,
  PillIndicator,
  PillStatus,
};

export type { PillAvatarProps } from "./pill-avatar";
export type { PillAvatarGroupProps } from "./pill-avatar-group";
export type { PillButtonProps } from "./pill-button";
export type { PillDeltaProps } from "./pill-delta";
export type { PillIconProps } from "./pill-icon";
export type { PillIndicatorProps } from "./pill-indicator";
export type { PillStatusProps } from "./pill-status";
