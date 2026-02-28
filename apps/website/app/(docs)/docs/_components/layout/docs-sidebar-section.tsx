"use client";

import { NavigationList } from "@kuzenbo/core/ui/navigation-list";

export const DocsSidebarSection = () => (
  <aside className="sticky top-[var(--kb-anchor-offset)] hidden self-start border-r py-4 pr-4 lg:block">
    <NavigationList className="w-full" variant="light">
      <NavigationList.Content className="border-0 bg-transparent p-0">
        <NavigationList.Group>
          <NavigationList.GroupLabel className="px-0">
            Sections
          </NavigationList.GroupLabel>
          <NavigationList.GroupContent>
            {/*          {section.pages.map((page) => (
                <NavigationList.Item key={page.href}>
                  <NavigationList.Link
                    label={page.title}
                    noWrap
                    render={<Link href={page.href} />}
                  />
                </NavigationList.Item>
              ))} */}
          </NavigationList.GroupContent>
        </NavigationList.Group>
      </NavigationList.Content>
    </NavigationList>
  </aside>
);
