"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { ComponentProps, KeyboardEvent } from "react";
import { cn } from "tailwind-variants";

import { CarouselContent } from "./carousel-content";
import { CarouselItem } from "./carousel-item";
import { CarouselNext } from "./carousel-next";
import { CarouselPrevious } from "./carousel-previous";
import { CarouselContext, useCarousel } from "./use-carousel";
import type { CarouselApi, CarouselProps } from "./use-carousel";

const Carousel = ({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: ComponentProps<"div"> & CarouselProps) => {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    plugins
  );
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback((emblaApi: CarouselApi) => {
    if (!emblaApi) {
      return;
    }
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, []);

  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.target !== event.currentTarget) {
        return;
      }

      const previousKey =
        orientation === "horizontal" ? "ArrowLeft" : "ArrowUp";
      const nextKey = orientation === "horizontal" ? "ArrowRight" : "ArrowDown";

      if (event.key === previousKey) {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === nextKey) {
        event.preventDefault();
        scrollNext();
      }
    },
    [orientation, scrollPrev, scrollNext]
  );

  useEffect(() => {
    if (!(api && setApi)) {
      return;
    }
    setApi(api);
  }, [api, setApi]);

  useEffect(() => {
    if (!api) {
      return;
    }
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);

    return () => {
      api?.off("select", onSelect);
    };
  }, [api, onSelect]);
  const resolvedOrientation =
    orientation || (opts?.axis === "y" ? "vertical" : "horizontal");
  const contextValue = useMemo(
    () => ({
      api,
      canScrollNext,
      canScrollPrev,
      carouselRef,
      opts,
      orientation: resolvedOrientation,
      scrollNext,
      scrollPrev,
    }),
    [
      carouselRef,
      api,
      opts,
      resolvedOrientation,
      scrollPrev,
      scrollNext,
      canScrollPrev,
      canScrollNext,
    ]
  );

  return (
    <CarouselContext.Provider value={contextValue}>
      {/** biome-ignore lint/a11y/useSemanticElements: region is not semantically appropriate for carousel */}
      <div
        aria-roledescription="carousel"
        className={cn("relative", className)}
        data-slot="carousel"
        onKeyDown={handleKeyDown}
        role="region"
        tabIndex={0}
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
};

Carousel.Content = CarouselContent;
Carousel.Item = CarouselItem;
Carousel.Next = CarouselNext;
Carousel.Previous = CarouselPrevious;

export type { CarouselApi } from "./use-carousel";

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarousel,
};

export type { CarouselProps } from "./use-carousel";

export type { CarouselContentProps } from "./carousel-content";
export type { CarouselItemProps } from "./carousel-item";
export type { CarouselNextProps } from "./carousel-next";
export type { CarouselPreviousProps } from "./carousel-previous";
