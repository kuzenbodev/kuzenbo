import type { Meta, StoryObj } from "@storybook/react";

import { Avatar } from "../avatar";

const avatarSizes = ["xs", "sm", "md", "lg", "xl"] as const;

const createAvatarDataUri = (
  initials: string,
  background: string,
  foreground: string
) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg viewBox="0 0 120 120"><rect width="120" height="120" fill="${background}" /><text x="50%" y="53%" dominant-baseline="middle" text-anchor="middle" font-family="ui-sans-serif,system-ui" font-size="42" font-weight="700" fill="${foreground}">${initials}</text></svg>`
  )}`;

export const baseMeta = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
} satisfies Meta<typeof Avatar>;

type Story = StoryObj<typeof baseMeta>;

export const Default: Story = {
  render: () => (
    <Avatar>
      <Avatar.Image
        src={createAvatarDataUri("CN", "#0F766E", "#FFFFFF")}
        alt="Camila Navarro"
      />
      <Avatar.Fallback>CN</Avatar.Fallback>
      <Avatar.Badge aria-label="Online" />
    </Avatar>
  ),
};

export const Fallback: Story = {
  render: () => (
    <Avatar>
      <Avatar.Fallback>JP</Avatar.Fallback>
    </Avatar>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-end gap-4">
        {avatarSizes.map((size) => (
          <div className="grid justify-items-center gap-2" key={size}>
            <Avatar size={size}>
              <Avatar.Image
                alt={`Ops manager ${size} avatar`}
                src={createAvatarDataUri(
                  size.slice(0, 1).toUpperCase(),
                  "#155DFC",
                  "#FFFFFF"
                )}
              />
              <Avatar.Fallback>
                {size.slice(0, 1).toUpperCase()}
              </Avatar.Fallback>
              <Avatar.Badge aria-hidden="true" />
            </Avatar>
            <span className="text-xs text-muted-foreground uppercase">
              {size}
            </span>
          </div>
        ))}
      </div>

      <Avatar.Group aria-label="Release team avatars">
        <Avatar size="sm">
          <Avatar.Image
            alt="Mila Chen"
            src={createAvatarDataUri("MC", "#7C3AED", "#FFFFFF")}
          />
          <Avatar.Fallback>MC</Avatar.Fallback>
        </Avatar>
        <Avatar size="sm">
          <Avatar.Image
            alt="Sam Brooks"
            src={createAvatarDataUri("SB", "#0D9488", "#FFFFFF")}
          />
          <Avatar.Fallback>SB</Avatar.Fallback>
        </Avatar>
        <Avatar size="sm">
          <Avatar.Image
            alt="Iris Holt"
            src={createAvatarDataUri("IH", "#CA8A04", "#111827")}
          />
          <Avatar.Fallback>IH</Avatar.Fallback>
        </Avatar>
        <Avatar.GroupCount>+5</Avatar.GroupCount>
      </Avatar.Group>
    </div>
  ),
};
