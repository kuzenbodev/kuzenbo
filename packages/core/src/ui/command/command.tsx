"use client";

import type { ComponentProps } from "react";

import { Command as CommandPrimitive } from "cmdk";
import { cn } from "tailwind-variants";

import type { InputSize } from "../input/input";

import { useComponentSize } from "../shared/size/size-provider";
import { CommandContext } from "./command-context";
import { CommandDialog } from "./command-dialog";
import { CommandEmpty } from "./command-empty";
import { CommandGroup } from "./command-group";
import { CommandInput } from "./command-input";
import { CommandItem } from "./command-item";
import { CommandList } from "./command-list";
import { CommandSeparator } from "./command-separator";
import { CommandShortcut } from "./command-shortcut";
export type CommandProps = ComponentProps<typeof CommandPrimitive> & {
  size?: InputSize;
};

const Command = ({ className, size: providedSize, ...props }: CommandProps) => {
  const size = useComponentSize(providedSize);

  return (
    <CommandContext.Provider value={{ size }}>
      <CommandPrimitive
        className={cn(
          "flex size-full flex-col overflow-hidden rounded-xl! bg-popover p-1 text-popover-foreground",
          className
        )}
        data-size={size}
        data-slot="command"
        {...props}
      />
    </CommandContext.Provider>
  );
};

Command.Dialog = CommandDialog;
Command.Empty = CommandEmpty;
Command.Group = CommandGroup;
Command.Input = CommandInput;
Command.Item = CommandItem;
Command.List = CommandList;
Command.Separator = CommandSeparator;
Command.Shortcut = CommandShortcut;

export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
};

export type { CommandDialogProps } from "./command-dialog";
export type { CommandEmptyProps } from "./command-empty";
export type { CommandGroupProps } from "./command-group";
export type { CommandInputProps } from "./command-input";
export type { CommandItemProps } from "./command-item";
export type { CommandListProps } from "./command-list";
export type { CommandSeparatorProps } from "./command-separator";
export type { CommandShortcutProps } from "./command-shortcut";
