"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { MoreVertical, Pencil, Trash2, Wrench } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { Card } from "@workspace/ui/components/card";
import { Checkbox } from "@workspace/ui/components/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { cn } from "@workspace/ui/lib/utils";
import type { Category } from "@workspace/database";
import type { ToolWithCategory } from "@/trpc/routers/toolsRouter";
import { useToolsSelection } from "@/modules/dashboard/hooks/use-tools-selection";
import { useRemoveTool } from "@/modules/dashboard/hooks/use-remove-tool";

export const ToolsGrid = ({ items }: { items: ToolWithCategory[] }) => {
  const router = useRouter();
  const { isSelected, toggle } = useToolsSelection();
  const removeTool = useRemoveTool();

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((tool) => {
        const id = tool._id as string;
        const checked = isSelected(id);
        const category = tool.category as Category | null;
        return (
          <Card
            key={id}
            data-state={checked ? "selected" : undefined}
            className={cn(
              "group relative cursor-pointer p-4 shadow-none transition hover:shadow-md",
              checked && "ring-2 ring-primary",
            )}
            onClick={() => router.push(`/dashboard/tools/${id}`)}
          >
            <div className="absolute top-3 left-3 opacity-0 transition group-hover:opacity-100 data-[state=selected]:opacity-100">
              <span onClick={(e) => e.stopPropagation()} className={checked ? "opacity-100" : ""}>
                <Checkbox
                  checked={checked}
                  onCheckedChange={() => toggle(id)}
                  aria-label={`Selecionar ${tool.title}`}
                  className={cn("bg-background", checked && "opacity-100")}
                />
              </span>
            </div>
            <div className="absolute top-3 right-3" onClick={(e) => e.stopPropagation()}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="ghost" className="size-7">
                    <MoreVertical className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={`/dashboard/tools/${id}`}>
                      <Pencil className="size-4" />
                      Editar
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.preventDefault();
                      removeTool.mutate({ id });
                    }}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="size-4" />
                    Excluir
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex flex-col items-start gap-3 pt-6">
              <div
                className={cn(
                  "flex size-12 items-center justify-center rounded-lg",
                  tool.bgColor ? "" : "bg-muted",
                )}
                style={tool.bgColor ? { backgroundColor: tool.bgColor } : undefined}
              >
                {tool.icon ? (
                  <DynamicIcon
                    name={tool.icon as IconName}
                    className="size-6"
                    style={tool.iconColor ? { color: tool.iconColor } : undefined}
                    fallback={() => <Wrench className="size-6" />}
                  />
                ) : (
                  <Wrench className="size-6" />
                )}
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-medium leading-tight">{tool.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{tool.description}</p>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                {category && (
                  <Badge variant="secondary" className="font-normal">
                    {category.name}
                  </Badge>
                )}
                {!tool.isActive && (
                  <Badge variant="outline" className="font-normal text-muted-foreground">
                    Inativa
                  </Badge>
                )}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
