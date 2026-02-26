export const DocsSectionLinks = () => (
  <nav>
    <ul className="m-0 grid list-none gap-1 p-0">
      {/*       {section.pages.map((page) => (
        <li key={page.href}>
          <Button
            className="w-full justify-start"
            nativeButton={false}
            render={<Link href={page.href} />}
            size="sm"
            variant={
              isDocsHrefActive(activeHref, page.href) ? "outline" : "ghost"
            }
          >
            {page.title}
          </Button>
        </li>
      ))} */}
    </ul>
  </nav>
);
