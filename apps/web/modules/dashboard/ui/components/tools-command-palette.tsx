"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { LayoutGrid, List, Plus, Tag, Wrench } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@workspace/ui/components/command";
import { useTRPC } from "@/trpc/client";
import { useToolsParams } from "@/modules/dashboard/hooks/use-tools-params";

export const ToolsCommandPalette = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [, setParams] = useToolsParams();
  const trpc = useTRPC();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const { data, isFetching } = useQuery({
    ...trpc.tools.getMany.queryOptions({ search, page: 1, pageSize: 8 }),
    enabled: open,
  });

  const go = (path: string) => {
    setOpen(false);
    router.push(path);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen} title="Buscar ferramentas" description="Procure ou execute uma ação">
      <CommandInput placeholder="Buscar ferramentas ou executar ação..." value={search} onValueChange={setSearch} />
      <CommandList>
        <CommandEmpty>{isFetching ? "Buscando..." : "Nenhum resultado"}</CommandEmpty>
        {data && data.items.length > 0 && (
          <CommandGroup heading="Ferramentas">
            {data.items.map((tool) => (
              <CommandItem
                key={tool._id as string}
                value={`tool-${tool._id}-${tool.title}`}
                onSelect={() => go(`/dashboard/tools/${tool._id}`)}
              >
                {tool.icon ? (
                  <DynamicIcon name={tool.icon as IconName} fallback={() => <Wrench />} />
                ) : (
                  <Wrench />
                )}
                <span>{tool.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
        <CommandSeparator />
        <CommandGroup heading="Ações">
          <CommandItem value="action-create" onSelect={() => go("/dashboard/tools/create")}>
            <Plus />
            <span>Criar nova ferramenta</span>
            <CommandShortcut>N</CommandShortcut>
          </CommandItem>
          <CommandItem value="action-categories" onSelect={() => go("/dashboard/categories")}>
            <Tag />
            <span>Ir para categorias</span>
          </CommandItem>
          <CommandItem
            value="action-view-table"
            onSelect={() => {
              setOpen(false);
              setParams((prev) => ({ ...prev, view: "table" }));
            }}
          >
            <List />
            <span>Visualizar como tabela</span>
          </CommandItem>
          <CommandItem
            value="action-view-grid"
            onSelect={() => {
              setOpen(false);
              setParams((prev) => ({ ...prev, view: "grid" }));
            }}
          >
            <LayoutGrid />
            <span>Visualizar como grid</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
