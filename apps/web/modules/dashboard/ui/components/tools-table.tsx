"use client";

import Link from "next/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowUp, ArrowUpDown, MoreVertical, Pencil, Trash2, Wrench } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { Checkbox } from "@workspace/ui/components/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import { cn } from "@workspace/ui/lib/utils";
import type { Category } from "@workspace/database";
import type { ToolWithCategory } from "@/trpc/routers/toolsRouter";
import { useToolsParams } from "@/modules/dashboard/hooks/use-tools-params";
import { useToolsSelection } from "@/modules/dashboard/hooks/use-tools-selection";
import { useRemoveTool } from "@/modules/dashboard/hooks/use-remove-tool";
import type { ToolsSort } from "@/modules/dashboard/tool-params";

type SortField = "title" | "createdAt" | "updatedAt";

const sortIcon = (current: ToolsSort, field: SortField) => {
  const [activeField, dir] = current.split("-");
  if (activeField !== field) return <ArrowUpDown className="size-3.5 opacity-50" />;
  return dir === "asc" ? <ArrowUp className="size-3.5" /> : <ArrowDown className="size-3.5" />;
};

const nextSort = (current: ToolsSort, field: SortField): ToolsSort => {
  const [activeField, dir] = current.split("-");
  if (activeField !== field) return `${field}-desc` as ToolsSort;
  if (dir === "desc") return `${field}-asc` as ToolsSort;
  return field === "title" ? "createdAt-desc" : "createdAt-desc";
};

export const ToolsTable = ({ items }: { items: ToolWithCategory[] }) => {
  const router = useRouter();
  const [params, setParams] = useToolsParams();
  const { isSelected, toggle, setMany, clear, count } = useToolsSelection();
  const removeTool = useRemoveTool();

  const allIds = items.map((tool) => tool._id as string);
  const allSelected = allIds.length > 0 && allIds.every((id) => isSelected(id));
  const someSelected = !allSelected && allIds.some((id) => isSelected(id));

  const handleSort = (field: SortField) => {
    setParams({ ...params, sort: nextSort(params.sort, field), page: 1 });
  };

  const handleRowClick = (id: string) => {
    router.push(`/dashboard/tools/${id}`);
  };

  return (
    <div className="rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10 pl-3">
              <Checkbox
                checked={allSelected ? true : someSelected ? "indeterminate" : false}
                onCheckedChange={(checked) => {
                  if (checked) setMany(allIds, true);
                  else if (count > 0) clear();
                  else setMany(allIds, false);
                }}
                aria-label="Selecionar todas"
              />
            </TableHead>
            <TableHead className="min-w-[240px]">
              <button
                type="button"
                onClick={() => handleSort("title")}
                className="inline-flex items-center gap-1 hover:text-foreground"
              >
                Ferramenta
                {sortIcon(params.sort, "title")}
              </button>
            </TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>
              <button
                type="button"
                onClick={() => handleSort("createdAt")}
                className="inline-flex items-center gap-1 hover:text-foreground"
              >
                Criada em
                {sortIcon(params.sort, "createdAt")}
              </button>
            </TableHead>
            <TableHead className="w-12 text-right pr-3" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((tool) => {
            const id = tool._id as string;
            const checked = isSelected(id);
            const category = tool.category as Category | null;
            return (
              <TableRow
                key={id}
                data-state={checked ? "selected" : undefined}
                className="cursor-pointer"
                onClick={() => handleRowClick(id)}
              >
                <TableCell className="pl-3" onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={checked}
                    onCheckedChange={() => toggle(id)}
                    aria-label={`Selecionar ${tool.title}`}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex size-9 items-center justify-center rounded-md",
                        tool.bgColor ? "" : "bg-muted",
                      )}
                      style={tool.bgColor ? { backgroundColor: tool.bgColor } : undefined}
                    >
                      {tool.icon ? (
                        <DynamicIcon
                          name={tool.icon as IconName}
                          className="size-5"
                          style={tool.iconColor ? { color: tool.iconColor } : undefined}
                          fallback={() => <Wrench className="size-5" />}
                        />
                      ) : (
                        <Wrench className="size-5" />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium leading-tight">{tool.title}</span>
                      <span className="text-xs text-muted-foreground line-clamp-1 max-w-md">
                        {tool.description}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {category ? (
                    <Badge variant="secondary" className="font-normal">
                      {category.name}
                    </Badge>
                  ) : (
                    <span className="text-xs text-muted-foreground">Sem categoria</span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={tool.isActive ? "default" : "outline"}
                    className={cn("font-normal", !tool.isActive && "text-muted-foreground")}
                  >
                    {tool.isActive ? "Ativa" : "Inativa"}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {tool.createdAt
                    ? format(new Date(tool.createdAt), "d MMM yyyy", { locale: ptBR })
                    : "—"}
                </TableCell>
                <TableCell className="pr-3 text-right" onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="ghost" className="size-8">
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
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
