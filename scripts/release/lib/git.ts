import { run } from "./shell";

export const getCurrentBranch = (): string => run("git branch --show-current");
