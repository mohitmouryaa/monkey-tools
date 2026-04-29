"use client";

import { useMemo, useState } from "react";
import { Check, ChevronsUpDown, Folder } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import { cn } from "@workspace/ui/lib/utils";
import { Button } from "@workspace/ui/components/button";
import { Popover, PopoverContent, PopoverTrigger } from "@workspace/ui/components/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@workspace/ui/components/command";

const POPULAR_ICONS: IconName[] = [
  "folder",
  "folder-open",
  "file",
  "file-text",
  "image",
  "wrench",
  "settings",
  "sparkles",
  "star",
  "heart",
  "zap",
  "rocket",
  "package",
  "box",
  "layers",
  "layout",
  "grid-2x2",
  "list",
  "tag",
  "bookmark",
  "flag",
  "award",
  "gift",
  "bell",
  "search",
  "filter",
  "download",
  "upload",
  "save",
  "share-2",
  "copy",
  "scissors",
  "edit",
  "trash-2",
  "lock",
  "key",
  "shield",
  "eye",
  "user",
  "users",
  "mail",
  "phone",
  "message-square",
  "send",
  "calendar",
  "clock",
  "timer",
  "home",
  "briefcase",
  "shopping-cart",
  "credit-card",
  "dollar-sign",
  "percent",
  "database",
  "server",
  "cloud",
  "hard-drive",
  "code",
  "terminal",
  "cpu",
  "smartphone",
  "laptop",
  "monitor",
  "camera",
  "video",
  "mic",
  "music",
  "map",
  "map-pin",
  "navigation",
  "compass",
  "globe",
  "sun",
  "moon",
  "cloud-rain",
  "activity",
  "trending-up",
  "bar-chart",
  "pie-chart",
  "line-chart",
  "link",
  "external-link",
  "anchor",
  "clipboard",
  "file-edit",
  "file-plus",
  "folder-plus",
  "archive",
  "scaling",
  "zoom-in",
  "zoom-out",
  "crosshair",
  "focus",
  "hand",
  "thumbs-up",
  "lightbulb",
  "book-open",
  "graduation-cap",
  "languages",
  "palette",
];

interface LucideIconPickerProps {
  value: string;
  onChange: (icon: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const LucideIconPicker = ({
  value,
  onChange,
  placeholder = "Selecione um ícone…",
  disabled,
}: LucideIconPickerProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return POPULAR_ICONS;
    return POPULAR_ICONS.filter((name) => name.includes(q));
  }, [search]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className="justify-between w-full font-mono text-sm"
        >
          {value ? (
            <span className="flex items-center gap-2 min-w-0">
              <DynamicIcon
                name={value as IconName}
                className="size-4 shrink-0"
                fallback={() => <Folder className="size-4 shrink-0" />}
              />
              <span className="truncate">{value}</span>
            </span>
          ) : (
            <span className="font-sans text-muted-foreground">{placeholder}</span>
          )}
          <ChevronsUpDown className="ml-2 size-4 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[320px]" align="start">
        <Command shouldFilter={false}>
          <CommandInput placeholder="Buscar ícone…" value={search} onValueChange={setSearch} />
          <CommandList className="max-h-[280px]">
            <CommandEmpty>Nenhum ícone encontrado.</CommandEmpty>
            <CommandGroup>
              {filtered.map((name) => (
                <CommandItem
                  key={name}
                  value={name}
                  onSelect={() => {
                    onChange(name);
                    setOpen(false);
                    setSearch("");
                  }}
                  className="font-mono text-xs"
                >
                  <Check className={cn("mr-2 size-4", value === name ? "opacity-100" : "opacity-0")} />
                  <DynamicIcon name={name} className="mr-2 size-4" />
                  <span className="truncate">{name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
