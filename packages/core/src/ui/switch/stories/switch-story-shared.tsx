import type { Meta, StoryObj } from "@storybook/react";
import { useCallback, useState } from "react";

import { Label } from "../../label/label";
import { Switch } from "../switch";

const switchSizes = ["xs", "sm", "md", "lg", "xl"] as const;

export const baseMeta = {
  argTypes: {
    defaultChecked: { control: "boolean" },
    disabled: { control: "boolean" },
    size: {
      control: "select",
      options: switchSizes,
    },
  },
  component: Switch,
  tags: ["autodocs"],
  title: "Components/Switch",
} satisfies Meta<typeof Switch>;

type Story = StoryObj<typeof baseMeta>;

const DefaultFeatureFlagExample = () => {
  const [enforceSso, setEnforceSso] = useState(false);
  const handleEnforceSsoChange = useCallback((nextChecked: boolean) => {
    setEnforceSso(nextChecked);
  }, []);

  return (
    <div className="grid gap-2">
      <Label className="flex items-center gap-2" htmlFor="enforce-sso">
        <Switch
          aria-label="Enforce SSO"
          checked={enforceSso}
          id="enforce-sso"
          onCheckedChange={handleEnforceSsoChange}
        />
        Enforce SSO for all collaborators
      </Label>
      <p className="text-muted-foreground text-sm">
        {enforceSso
          ? "Password login is disabled for this workspace."
          : "Members can still sign in with local credentials."}
      </p>
    </div>
  );
};

const CheckedByDefaultExample = () => {
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const handleAlertsEnabledChange = useCallback((nextChecked: boolean) => {
    setAlertsEnabled(nextChecked);
  }, []);

  return (
    <div className="grid gap-2">
      <Label className="flex items-center gap-2" htmlFor="alert-routing">
        <Switch
          aria-label="Incident alert routing"
          checked={alertsEnabled}
          id="alert-routing"
          onCheckedChange={handleAlertsEnabledChange}
        />
        Route high-priority alerts to the on-call channel
      </Label>
      <p className="text-muted-foreground text-sm">
        {alertsEnabled
          ? "Pager routing is active for critical incidents."
          : "Critical alerts stay in the dashboard inbox."}
      </p>
    </div>
  );
};

const SmallDensityExample = () => {
  const [compactMode, setCompactMode] = useState(false);
  const handleCompactModeChange = useCallback((nextChecked: boolean) => {
    setCompactMode(nextChecked);
  }, []);

  return (
    <div className="grid gap-2">
      <Label className="flex items-center gap-2" htmlFor="compact-mode">
        <Switch
          aria-label="Compact mode"
          checked={compactMode}
          id="compact-mode"
          onCheckedChange={handleCompactModeChange}
          size="sm"
        />
        Compact table density
      </Label>
      <p className="text-muted-foreground text-sm">
        {compactMode
          ? "Rows are compressed for operations teams handling large queues."
          : "Rows use standard spacing for easier scanning."}
      </p>
    </div>
  );
};

const WithLabelExample = () => {
  const [dailyDigest, setDailyDigest] = useState(true);
  const handleDailyDigestChange = useCallback((nextChecked: boolean) => {
    setDailyDigest(nextChecked);
  }, []);

  return (
    <div className="grid gap-2">
      <Label className="flex items-center gap-2" htmlFor="daily-digest">
        <Switch
          aria-label="Daily digest"
          checked={dailyDigest}
          id="daily-digest"
          onCheckedChange={handleDailyDigestChange}
        />
        Send daily finance digest to stakeholders
      </Label>
      <p className="text-muted-foreground text-sm">
        {dailyDigest
          ? "Digest delivery is scheduled for 8:00 AM local time."
          : "Stakeholders will only receive ad-hoc notifications."}
      </p>
    </div>
  );
};

const CustomThumbExample = () => {
  const [rolloutEnabled, setRolloutEnabled] = useState(true);
  const handleRolloutEnabledChange = useCallback((nextChecked: boolean) => {
    setRolloutEnabled(nextChecked);
  }, []);

  return (
    <div className="grid gap-2">
      <Label className="flex items-center gap-2" htmlFor="rollout-switch">
        <Switch
          aria-label="Gradual rollout"
          checked={rolloutEnabled}
          id="rollout-switch"
          onCheckedChange={handleRolloutEnabledChange}
        >
          <Switch.Thumb>
            <span className="sr-only">Rollout state thumb</span>
          </Switch.Thumb>
        </Switch>
        Gradual feature rollout
      </Label>
      <p className="text-muted-foreground text-sm">
        {rolloutEnabled
          ? "New behavior is enabled for 20% of customer accounts."
          : "Rollout is paused and all accounts use stable behavior."}
      </p>
    </div>
  );
};

export const Default: Story = {
  render: () => <DefaultFeatureFlagExample />,
};

export const Checked: Story = {
  render: () => <CheckedByDefaultExample />,
};

export const Small: Story = {
  render: () => <SmallDensityExample />,
};

export const Disabled: Story = {
  render: () => (
    <div className="grid gap-2">
      <Label className="flex items-center gap-2" htmlFor="locked-switch">
        <Switch aria-label="Locked setting" disabled id="locked-switch" />
        Allow external API tokens
      </Label>
      <p className="text-muted-foreground text-sm">
        This setting is managed by organization owners.
      </p>
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => <WithLabelExample />,
};

export const Sizes: Story = {
  render: () => (
    <div className="grid gap-2">
      {switchSizes.map((size) => (
        <div className="flex items-center gap-2" key={size}>
          <Switch
            aria-label={`${size} switch`}
            defaultChecked
            id={`switch-${size}`}
            size={size}
          />
          <Label htmlFor={`switch-${size}`}>{size.toUpperCase()} density</Label>
        </div>
      ))}
    </div>
  ),
};

export const CustomThumb: Story = {
  render: () => <CustomThumbExample />,
};
