"use client";

import { Check, ChevronDownIcon } from "lucide-react";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import { cn } from "@workspace/ui/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@workspace/ui/components/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@workspace/ui/components/command";

interface PostToolsMultiSelectProps {
  value: string[];
  onChange: (ids: string[]) => void;
  disabled?: boolean;
}

export const PostToolsMultiSelect = ({ value, onChange, disabled }: PostToolsMultiSelectProps) => {
  const trpc = useTRPC();
  const { data, isLoading } = useQuery(trpc.tools.getMany.queryOptions({ pageSize: 100 }));

  const tools = data?.items ?? [];
  const selectedTools = tools.filter((t) => value.includes(t._id as string));

  const toggle = (id: string) => {
    if (value.includes(id)) {
      onChange(value.filter((v) => v !== id));
    } else {
      onChange([...value, id]);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          disabled={disabled || isLoading}
          className="w-full justify-between min-h-10 h-auto py-2"
        >
          <div className="flex flex-wrap gap-1">
            {selectedTools.length === 0 ? (
              <span className="text-muted-foreground">Select tools...</span>
            ) : (
              selectedTools.map((t) => (
                <Badge key={t._id as string} variant="secondary">
                  {t.title}
                </Badge>
              ))
            )}
          </div>
          <ChevronDownIcon className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search tools..." />
          <CommandList>
            <CommandEmpty>No tools found.</CommandEmpty>
            <CommandGroup>
              {tools.map((tool) => {
                const id = tool._id as string;
                const isSelected = value.includes(id);
                return (
                  <CommandItem key={id} value={tool.title} onSelect={() => toggle(id)}>
                    <Check className={cn("mr-2 size-4", isSelected ? "opacity-100" : "opacity-0")} />
                    {tool.title}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
