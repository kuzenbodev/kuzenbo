import type { Meta, StoryObj } from "@storybook/react";
import { useCallback, useState } from "react";

import { Button } from "../../button/button";
import { Announcement } from "../announcement";

export const baseMeta = {
  title: "Components/Announcement",
  component: Announcement,
  tags: ["autodocs"],
} satisfies Meta<typeof Announcement>;

type Story = StoryObj<typeof baseMeta>;

const DismissibleAnnouncementDemo = () => {
  const [visible, setVisible] = useState(true);
  const handleRestore = useCallback(() => {
    setVisible(true);
  }, []);
  const handleDismiss = useCallback(() => {
    setVisible(false);
  }, []);

  if (!visible) {
    return (
      <Button onClick={handleRestore} size="sm" variant="outline">
        Restore release announcement
      </Button>
    );
  }

  return (
    <Announcement>
      <Announcement.Tag>Release</Announcement.Tag>
      <Announcement.Title>
        Usage forecasting is now live for all Pro workspaces.
      </Announcement.Title>
      <Button onClick={handleDismiss} size="xs" variant="outline">
        Dismiss
      </Button>
    </Announcement>
  );
};

export const Default: Story = {
  render: () => (
    <Announcement>
      <Announcement.Tag>Launch</Announcement.Tag>
      <Announcement.Title>
        Saved filters are now available in pipeline analytics.
      </Announcement.Title>
    </Announcement>
  ),
};

export const Dismissible: Story = {
  render: () => <DismissibleAnnouncementDemo />,
};

export const WithAction: Story = {
  render: () => (
    <Announcement>
      <Announcement.Tag>Update</Announcement.Tag>
      <Announcement.Title>
        Billing exports now include mapped cost centers.
      </Announcement.Title>
      <Button size="xs" variant="outline">
        Read changelog
      </Button>
    </Announcement>
  ),
};
