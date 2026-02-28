import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";

import { type CarouselApi, Carousel } from "../carousel";

const releaseSlides = [
  {
    id: "intake",
    title: "Intake validated",
    detail: "42 purchase requests passed policy checks this morning.",
    metric: "42 requests",
  },
  {
    id: "legal",
    title: "Legal review queue",
    detail: "8 contracts are waiting for regional clause approval.",
    metric: "8 contracts",
  },
  {
    id: "finance",
    title: "Finance approval",
    detail: "$1.2M in procurement spend is pending controller sign-off.",
    metric: "$1.2M",
  },
] as const;

const roadmapSlides = [
  {
    id: "release-17",
    label: "Release 17",
    summary: "Automated invoice matching for EMEA vendors.",
  },
  {
    id: "release-18",
    label: "Release 18",
    summary: "Vendor risk scorecards in procurement workspace.",
  },
  {
    id: "release-19",
    label: "Release 19",
    summary: "Approval policy builder with audit-ready history.",
  },
  {
    id: "release-20",
    label: "Release 20",
    summary: "Cross-region SLA alerts with escalation routing.",
  },
] as const;

export const baseMeta = {
  title: "Components/Carousel",
  component: Carousel,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Carousel>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  render: () => (
    <Carousel className="w-[420px]" opts={{ align: "start" }}>
      <Carousel.Content>
        {releaseSlides.map((slide) => (
          <Carousel.Item className="basis-full" key={slide.id}>
            <div className="border-border bg-card grid gap-3 rounded-lg border p-4">
              <div className="text-sm font-medium">{slide.title}</div>
              <div className="text-muted-foreground text-sm">
                {slide.detail}
              </div>
              <div className="text-primary text-xs font-medium">
                {slide.metric}
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel.Content>
      <Carousel.Previous />
      <Carousel.Next />
    </Carousel>
  ),
};

const AutoplayCarousel = () => {
  const [api, setApi] = useState<CarouselApi | null>(null);

  useEffect(() => {
    if (!api) {
      return;
    }

    const interval = window.setInterval(() => {
      api.scrollNext();
    }, 2600);

    return () => {
      window.clearInterval(interval);
    };
  }, [api]);

  return (
    <Carousel className="w-[420px]" opts={{ loop: true }} setApi={setApi}>
      <Carousel.Content>
        {roadmapSlides.map((slide) => (
          <Carousel.Item className="basis-full" key={slide.id}>
            <div className="border-border bg-card grid gap-3 rounded-lg border p-4">
              <div className="text-muted-foreground text-xs font-medium uppercase">
                {slide.label}
              </div>
              <div className="text-sm">{slide.summary}</div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel.Content>
      <Carousel.Previous />
      <Carousel.Next />
    </Carousel>
  );
};

export const Autoplay: Story = {
  render: () => <AutoplayCarousel />,
};

const ThumbnailNavigationCarousel = () => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    const syncActiveIndex = () => {
      setActiveIndex(api.selectedScrollSnap());
    };

    syncActiveIndex();
    api.on("select", syncActiveIndex);
    api.on("reInit", syncActiveIndex);

    return () => {
      api.off("select", syncActiveIndex);
      api.off("reInit", syncActiveIndex);
    };
  }, [api]);

  return (
    <div className="grid w-[420px] gap-3">
      <Carousel className="w-full" opts={{ align: "start" }} setApi={setApi}>
        <Carousel.Content>
          {releaseSlides.map((slide) => (
            <Carousel.Item className="basis-full" key={slide.id}>
              <div className="border-border bg-card grid gap-2 rounded-lg border p-4">
                <div className="text-sm font-medium">{slide.title}</div>
                <div className="text-muted-foreground text-sm">
                  {slide.detail}
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel.Content>
        <Carousel.Previous />
        <Carousel.Next />
      </Carousel>

      <div className="grid grid-cols-3 gap-2">
        {releaseSlides.map((slide, index) => (
          <div
            className="border-border bg-background hover:bg-muted data-[active=true]:border-primary data-[active=true]:bg-primary data-[active=true]:text-primary-foreground rounded-md border px-2 py-1 text-left text-xs font-medium transition-colors"
            data-active={activeIndex === index}
            key={slide.id}
          >
            {slide.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export const ThumbnailNavigation: Story = {
  render: () => <ThumbnailNavigationCarousel />,
};
