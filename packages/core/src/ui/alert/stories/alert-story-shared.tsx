import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../../button/button";
import { Alert, AlertAction, AlertDescription, AlertTitle } from "../alert";

export const baseMeta = {
  argTypes: {
    appearance: {
      control: "select",
      options: ["default", "subtle", "outline", "inverted"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    variant: {
      control: "select",
      options: [
        "default",
        "primary",
        "secondary",
        "warning",
        "danger",
        "info",
        "success",
      ],
    },
  },
  component: Alert,
  subcomponents: {
    AlertAction,
    AlertDescription,
    AlertTitle,
  },
  tags: ["autodocs"],
  title: "Components/Alert",
} satisfies Meta<typeof Alert>;

type Story = StoryObj<typeof baseMeta>;

const appearanceOptions = ["default", "subtle", "outline", "inverted"] as const;
const variantOptions = [
  "default",
  "primary",
  "secondary",
  "warning",
  "danger",
  "info",
  "success",
] as const;
const sizeOptions = ["xs", "sm", "md", "lg", "xl"] as const;

const StoryAlertIcon = () => (
  <svg
    aria-hidden="true"
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="M12 8V13M12 16.5H12.01"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    />
  </svg>
);

export const Default: Story = {
  args: { variant: "default" },
  render: (args) => (
    <Alert {...args}>
      <StoryAlertIcon />
      <Alert.Title>Heads up!</Alert.Title>
      <Alert.Description>
        You can add components to your app using the CLI.
      </Alert.Description>
    </Alert>
  ),
};

export const Danger: Story = {
  args: { variant: "danger" },
  render: (args) => (
    <Alert {...args}>
      <StoryAlertIcon />
      <Alert.Title>Error</Alert.Title>
      <Alert.Description>
        Your session has expired. Please log in again.
      </Alert.Description>
    </Alert>
  ),
};

export const Primary: Story = {
  args: { variant: "primary" },
  render: (args) => (
    <Alert {...args}>
      <StoryAlertIcon />
      <Alert.Title>Product update</Alert.Title>
      <Alert.Description>
        We rolled out a new editor experience for all teams.
      </Alert.Description>
    </Alert>
  ),
};

export const Secondary: Story = {
  args: { variant: "secondary" },
  render: (args) => (
    <Alert {...args}>
      <StoryAlertIcon />
      <Alert.Title>System note</Alert.Title>
      <Alert.Description>
        Weekly analytics snapshots are generated every Monday at 09:00.
      </Alert.Description>
    </Alert>
  ),
};

export const Warning: Story = {
  args: { variant: "warning" },
  render: (args) => (
    <Alert {...args}>
      <StoryAlertIcon />
      <Alert.Title>Warning</Alert.Title>
      <Alert.Description>
        Your trial is expiring soon. Upgrade to continue.
      </Alert.Description>
    </Alert>
  ),
};

export const Success: Story = {
  args: { variant: "success" },
  render: (args) => (
    <Alert {...args}>
      <StoryAlertIcon />
      <Alert.Title>Success</Alert.Title>
      <Alert.Description>
        Your changes have been saved successfully.
      </Alert.Description>
    </Alert>
  ),
};

export const Info: Story = {
  args: { variant: "info" },
  render: (args) => (
    <Alert {...args}>
      <StoryAlertIcon />
      <Alert.Title>Note</Alert.Title>
      <Alert.Description>This feature is currently in beta.</Alert.Description>
    </Alert>
  ),
};

export const Subtle: Story = {
  args: { appearance: "subtle", variant: "warning" },
  render: (args) => (
    <Alert {...args}>
      <StoryAlertIcon />
      <Alert.Title>Subtle warning</Alert.Title>
      <Alert.Description>
        Your API token will expire in 3 days. Rotate it to avoid downtime.
      </Alert.Description>
    </Alert>
  ),
};

export const Outline: Story = {
  args: { appearance: "outline", variant: "primary" },
  render: (args) => (
    <Alert {...args}>
      <StoryAlertIcon />
      <Alert.Title>Outlined highlight</Alert.Title>
      <Alert.Description>
        Priority support is now available on your current plan.
      </Alert.Description>
    </Alert>
  ),
};

export const Inverted: Story = {
  args: { appearance: "inverted", variant: "success" },
  render: (args) => (
    <Alert {...args}>
      <StoryAlertIcon />
      <Alert.Title>Notification! All good</Alert.Title>
      <Alert.Description>
        This is a dark surface alert with a semantic success accent.
      </Alert.Description>
    </Alert>
  ),
};

export const WithAction: Story = {
  args: { variant: "default" },
  render: (args) => (
    <Alert {...args}>
      <StoryAlertIcon />
      <Alert.Title>Update available</Alert.Title>
      <Alert.Description>
        A new version is available. Update now to get the latest features.
      </Alert.Description>
      <Alert.Action>
        <Button size="xs" variant="outline">
          Update
        </Button>
      </Alert.Action>
    </Alert>
  ),
};

export const AllCombinations: Story = {
  render: () => (
    <div className="space-y-6">
      {appearanceOptions.map((appearance) => (
        <div className="space-y-3" key={appearance}>
          <div className="text-foreground font-medium capitalize">
            Appearance: {appearance}
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {variantOptions.map((variant) => (
              <Alert
                appearance={appearance}
                key={`${appearance}-${variant}`}
                variant={variant}
              >
                <StoryAlertIcon />
                <Alert.Title>{variant}</Alert.Title>
                <Alert.Description>
                  <code>{`variant="${variant}" appearance="${appearance}"`}</code>
                </Alert.Description>
              </Alert>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-3">
      {sizeOptions.map((size) => (
        <Alert key={size} size={size} variant="default">
          <StoryAlertIcon />
          <Alert.Title>{size.toUpperCase()} alert</Alert.Title>
          <Alert.Description>
            This alert uses the <code>{`size="${size}"`}</code> scale.
          </Alert.Description>
        </Alert>
      ))}
    </div>
  ),
};

export const SizesWithAction: Story = {
  render: () => (
    <div className="space-y-3">
      {sizeOptions.map((size) => (
        <Alert key={size} size={size} variant="warning">
          <StoryAlertIcon />
          <Alert.Title>{size.toUpperCase()} action alert</Alert.Title>
          <Alert.Description>
            Action spacing and offset follow <code>{`size="${size}"`}</code>.
          </Alert.Description>
          <Alert.Action>
            <Button size="xs" variant="outline">
              Review
            </Button>
          </Alert.Action>
        </Alert>
      ))}
    </div>
  ),
};
