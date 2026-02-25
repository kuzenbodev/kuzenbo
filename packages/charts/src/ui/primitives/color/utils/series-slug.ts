const slugifySeriesKey = (seriesKey: string) => {
  const normalized = seriesKey
    .trim()
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/-{2,}/g, "-")
    .replaceAll(/^-+|-+$/g, "");

  return normalized || "series";
};

const ensureUniqueSlug = (slug: string, usedSlugs: Set<string>) => {
  if (!usedSlugs.has(slug)) {
    usedSlugs.add(slug);
    return slug;
  }

  let counter = 2;

  while (usedSlugs.has(`${slug}-${counter}`)) {
    counter += 1;
  }

  const uniqueSlug = `${slug}-${counter}`;
  usedSlugs.add(uniqueSlug);

  return uniqueSlug;
};

export { ensureUniqueSlug, slugifySeriesKey };
