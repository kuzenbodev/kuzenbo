"use client";

import { ActionIcon } from "@kuzenbo/core/ui/action-icon";
import { Button } from "@kuzenbo/core/ui/button";
import { Drawer } from "@kuzenbo/core/ui/drawer";
import { NavigationMenu } from "@kuzenbo/core/ui/navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "tailwind-variants";

const NAVIGATION_ITEMS = [
  { href: "/docs", label: "Docs", match: "exact" },
  { href: "/docs/getting-started", label: "Getting Started", match: "prefix" },
  { href: "/docs/components", label: "Components", match: "prefix" },
  { href: "/docs/hooks", label: "Hooks", match: "prefix" },
  { href: "/showcase", label: "Showcase", match: "exact" },
  { href: "/showcase/playground", label: "Playground", match: "prefix" },
] as const;

type NavigationMatchMode = (typeof NAVIGATION_ITEMS)[number]["match"];

interface HeaderNavigationProps {
  pathname?: string;
}

const isActivePath = (
  pathname: string,
  href: string,
  match: NavigationMatchMode
): boolean => {
  if (match === "exact") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
};

const getAriaCurrent = (
  pathname: string,
  href: string,
  match: NavigationMatchMode
): "location" | "page" | undefined => {
  if (pathname === href) {
    return "page";
  }

  if (match === "prefix" && pathname.startsWith(`${href}/`)) {
    return "location";
  }

  return undefined;
};

const MenuIcon = () => (
  <svg aria-hidden fill="none" height="16" viewBox="0 0 16 16" width="16">
    <path
      d="M2.5 4.25H13.5M2.5 8H13.5M2.5 11.75H13.5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

const CloseIcon = () => (
  <svg aria-hidden fill="none" height="16" viewBox="0 0 16 16" width="16">
    <path
      d="M3.5 3.5L12.5 12.5M12.5 3.5L3.5 12.5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

export const HeaderNavigation = ({ pathname }: HeaderNavigationProps = {}) => {
  const routePathname = usePathname();
  const resolvedPathname = pathname ?? routePathname ?? "/";

  return (
    <>
      <nav
        aria-label="Primary navigation"
        className="hidden items-center md:flex"
      >
        <NavigationMenu className="w-full justify-start">
          <NavigationMenu.List className="justify-start">
            {NAVIGATION_ITEMS.map((item) => {
              const isActive = isActivePath(
                resolvedPathname,
                item.href,
                item.match
              );
              const ariaCurrent = getAriaCurrent(
                resolvedPathname,
                item.href,
                item.match
              );

              return (
                <NavigationMenu.Item key={item.label}>
                  <NavigationMenu.Link
                    aria-current={ariaCurrent}
                    className="text-muted-foreground data-[active=true]:text-foreground"
                    data-active={isActive ? "true" : undefined}
                    render={<Link href={item.href} />}
                  >
                    {item.label}
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
              );
            })}
          </NavigationMenu.List>
        </NavigationMenu>
      </nav>

      <Drawer.Root swipeDirection="down">
        <Drawer.Trigger
          aria-label="Open navigation menu"
          className="md:hidden"
          render={
            <ActionIcon
              aria-label="Open navigation menu"
              size="sm"
              variant="outline"
            />
          }
        >
          <MenuIcon />
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Backdrop className="md:hidden" />
          <Drawer.Viewport className="md:hidden">
            <Drawer.Popup>
              <Drawer.Content className="mx-0 w-full max-w-none">
                <div className="mb-3 flex items-center justify-center">
                  <Drawer.Handle className="mb-0" />
                </div>
                <div className="mb-4 flex items-center justify-between">
                  <Drawer.Title className="text-base leading-none">
                    Navigation
                  </Drawer.Title>
                  <Drawer.Close
                    aria-label="Close navigation menu"
                    render={
                      <ActionIcon
                        aria-label="Close navigation menu"
                        size="sm"
                        variant="ghost"
                      />
                    }
                  >
                    <CloseIcon />
                  </Drawer.Close>
                </div>
                <Drawer.Description className="mb-4 text-sm">
                  Browse docs and examples.
                </Drawer.Description>
                <nav aria-label="Mobile navigation">
                  <ul className="m-0 grid list-none gap-1 p-0">
                    {NAVIGATION_ITEMS.map((item) => {
                      const isActive = isActivePath(
                        resolvedPathname,
                        item.href,
                        item.match
                      );
                      const ariaCurrent = getAriaCurrent(
                        resolvedPathname,
                        item.href,
                        item.match
                      );

                      return (
                        <li key={item.label}>
                          <Button
                            className={cn(
                              "w-full justify-start",
                              isActive && "bg-muted text-foreground"
                            )}
                            data-active={isActive ? "true" : undefined}
                            nativeButton={false}
                            render={
                              <Link
                                aria-current={ariaCurrent}
                                href={item.href}
                              />
                            }
                            variant="ghost"
                          >
                            {item.label}
                          </Button>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </Drawer.Content>
            </Drawer.Popup>
          </Drawer.Viewport>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
};
