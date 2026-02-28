interface ParsedArgs {
  values: Record<string, string>;
  flags: Set<string>;
}

export const parseArgs = (argv: string[]): ParsedArgs => {
  const values: Record<string, string> = {};
  const flags = new Set<string>();

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];

    if (!token || !token.startsWith("--")) {
      continue;
    }

    const key = token.slice(2);
    const nextToken = argv[index + 1];

    if (!nextToken || nextToken.startsWith("--")) {
      flags.add(key);
      continue;
    }

    values[key] = nextToken;
    index += 1;
  }

  return { flags, values };
};

export const getRequiredArg = (args: ParsedArgs, key: string): string => {
  const value = args.values[key];
  if (!value) {
    throw new Error(`Missing required argument: --${key}`);
  }

  return value;
};

export const getOptionalArg = (
  args: ParsedArgs,
  key: string
): string | undefined => args.values[key];

export const getBooleanFlag = (args: ParsedArgs, key: string): boolean =>
  args.flags.has(key);
