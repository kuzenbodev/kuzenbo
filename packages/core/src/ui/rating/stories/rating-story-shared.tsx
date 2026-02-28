import type { Meta, StoryObj } from "@storybook/react";
import { useCallback, useMemo, useState } from "react";

import { Rating } from "../rating";

const ratingSizes = ["xs", "sm", "md", "lg", "xl"] as const;

export const baseMeta = {
  argTypes: {
    editable: { control: "boolean" },
    maxRating: { control: "number" },
    rating: { control: "number", max: 5, min: 0, step: 0.5 },
    showValue: { control: "boolean" },
    size: {
      control: "select",
      options: ratingSizes,
    },
  },
  component: Rating,
  tags: ["autodocs"],
  title: "Components/Rating",
} satisfies Meta<typeof Rating>;

type Story = StoryObj<typeof baseMeta>;

const ReviewRatingExample = () => {
  const [score, setScore] = useState(4);
  const handleScoreChange = useCallback((nextRating: number) => {
    setScore(nextRating);
  }, []);

  const reviewSummary = useMemo(() => {
    if (score >= 4.5) {
      return "Outstanding support quality and response time.";
    }

    if (score >= 3.5) {
      return "Strong quality with minor process follow-ups needed.";
    }

    if (score >= 2.5) {
      return "Mixed quality. Escalate for operational review.";
    }

    return "Below expectations. Trigger incident postmortem.";
  }, [score]);

  return (
    <div className="grid gap-2">
      <Rating
        editable
        onRatingChange={handleScoreChange}
        rating={score}
        showValue
      />
      <p className="text-muted-foreground text-sm">{reviewSummary}</p>
    </div>
  );
};

const ReadOnlyQualitySnapshotExample = () => (
  <div className="grid gap-2">
    <Rating editable={false} rating={4.6} showValue />
    <p className="text-muted-foreground text-sm">
      Last 30 days partner satisfaction score (read-only).
    </p>
  </div>
);

export const Default: Story = {
  args: { rating: 3.8, showValue: true },
};

export const Sizes: Story = {
  args: {
    rating: 3.5,
  },
  render: () => (
    <div className="grid gap-3">
      {ratingSizes.map((size) => (
        <div className="flex items-center gap-2" key={size}>
          <Rating rating={3.5} showValue size={size} />
          <span className="text-muted-foreground text-sm">{size}</span>
        </div>
      ))}
    </div>
  ),
};

export const EditableWithValue: Story = {
  args: { editable: true, rating: 4, showValue: true },
  render: () => <ReviewRatingExample />,
};

export const ReadOnly: Story = {
  args: { editable: false, rating: 4.6, showValue: true },
  render: () => <ReadOnlyQualitySnapshotExample />,
};
