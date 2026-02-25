export const PACKAGE_MANAGERS = ["npm", "pnpm", "yarn", "bun"] as const;

export type PackageManager = (typeof PACKAGE_MANAGERS)[number];

export const PACKAGE_MANAGER_LABEL_BY_VALUE: Record<PackageManager, string> = {
  npm: "npm",
  pnpm: "pnpm",
  yarn: "yarn",
  bun: "bun",
};

export const isPackageManager = (
  value: string | null | undefined
): value is PackageManager => {
  if (!value) {
    return false;
  }

  return PACKAGE_MANAGERS.includes(value as PackageManager);
};
