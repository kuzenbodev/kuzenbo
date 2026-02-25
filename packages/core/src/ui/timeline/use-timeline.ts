"use client";

import { createContext, useContext } from "react";

type Direction = "ltr" | "rtl";
type Orientation = "vertical" | "horizontal";
type Variant = "default" | "alternate";
type Status = "completed" | "active" | "pending";

interface TimelineContextValue {
  orientation: Orientation;
  variant: Variant;
  dir: Direction;
  activeIndex?: number;
}

interface TimelineItemContextValue {
  index: number;
  status: Status;
  isAlternateRight: boolean;
}

const TimelineContext = createContext<TimelineContextValue | null>(null);

const useTimeline = () => {
  const context = useContext(TimelineContext);

  if (!context) {
    throw new Error("useTimeline must be used within a <Timeline />");
  }

  return context;
};

const TimelineItemContext = createContext<TimelineItemContextValue | null>(
  null
);

const useTimelineItem = () => {
  const context = useContext(TimelineItemContext);

  if (!context) {
    throw new Error("useTimelineItem must be used within a <TimelineItem />");
  }

  return context;
};

const getItemStatus = (itemIndex: number, activeIndex?: number): Status => {
  if (activeIndex === undefined) {
    return "pending";
  }
  if (itemIndex < activeIndex) {
    return "completed";
  }
  if (itemIndex === activeIndex) {
    return "active";
  }
  return "pending";
};

export {
  type Direction,
  type Orientation,
  type Status,
  type TimelineContextValue,
  type TimelineItemContextValue,
  type Variant,
  getItemStatus,
  TimelineContext,
  TimelineItemContext,
  useTimeline,
  useTimelineItem,
};
