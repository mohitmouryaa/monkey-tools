"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, BookOpen, CornerDownLeft, FolderOpen, Search as SearchIcon, Wrench } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@workspace/ui/components/command";
import { cn } from "@workspace/ui/lib/utils";
import { getToolAliases } from "./search-intents";

export interface SearchIndex {
  categories: Array<{
    _id: string;
    name: string;
    slug: string;
    icon: string;
    color?: string;
    tools: Array<{
      _id: string;
      title: string;
      link: string;
      description: string;
      icon: string;
      seoKeywords: string;
    }>;
  }>;
  posts: Array<{
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    searchText: string;
  }>;
}

interface NavSearchProps {
  index: SearchIndex;
}

const isMac = () => typeof navigator !== "undefined" && /mac|iphone|ipad|ipod/i.test(navigator.platform);

export const NavSearch = ({ index }: NavSearchProps) => {
  const [open, setOpen] = useState(false);
  const [mac, setMac] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMac(isMac());
    const handler = (event: KeyboardEvent) => {
      if ((event.key === "k" || event.key === "K") && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const flatTools = useMemo(
    () =>
      index.categories.flatMap((category) =>
        category.tools.map((tool) => ({
          ...tool,
          categoryName: category.name,
          categorySlug: category.slug,
          categoryColor: category.color || "hsl(217 91% 60%)",
        })),
      ),
    [index.categories],
  );

  const navigate = (path: string) => {
    setOpen(false);
    router.push(path);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Pesquisar (Ctrl/Cmd + K)"
        className={cn(
          "group relative inline-flex h-9 w-full max-w-xs items-center gap-2 rounded-lg border border-border/60 bg-muted/40 px-3 text-sm text-muted-foreground transition-colors",
          "hover:bg-muted/70 hover:text-foreground hover:border-border",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        )}
      >
        <SearchIcon className="h-4 w-4 shrink-0" aria-hidden />
        <span className="flex-1 truncate text-left">Pesquisar ferramentas...</span>
        <kbd className="pointer-events-none hidden items-center gap-1 rounded border border-border/60 bg-background px-1.5 py-0.5 font-mono text-[10px] font-medium text-muted-foreground sm:inline-flex">
          <span className="text-[11px]">{mac ? "⌘" : "Ctrl"}</span>K
        </kbd>
      </button>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Pesquisar"
        description="Encontre ferramentas, categorias e artigos do blog"
        className="max-w-2xl"
      >
        <CommandInput placeholder="O que você quer fazer? Ex: juntar pdf, comprimir imagem..." />
        <CommandList className="max-h-[420px]">
          <CommandEmpty>
            <div className="flex flex-col items-center gap-2 py-6">
              <SearchIcon className="h-6 w-6 text-muted-foreground" aria-hidden />
              <p className="text-sm font-medium text-foreground">Nada encontrado</p>
              <p className="text-xs text-muted-foreground">Tente outro termo ou navegue pelas categorias.</p>
            </div>
          </CommandEmpty>

          {flatTools.length > 0 && (
            <CommandGroup heading="Ferramentas">
              {flatTools.map((tool) => (
                <CommandItem
                  key={tool._id}
                  value={`${tool.title} ${tool.description} ${tool.seoKeywords} ${tool.categoryName} ${getToolAliases(tool.link)}`}
                  onSelect={() => navigate(`/ferramentas/${tool.categorySlug}/${tool.link}`)}
                >
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md"
                    style={{
                      background: `color-mix(in srgb, ${tool.categoryColor} 12%, transparent)`,
                      color: tool.categoryColor,
                    }}
                    aria-hidden
                  >
                    <DynamicIcon
                      name={tool.icon as IconName}
                      className="h-4 w-4"
                      fallback={() => <Wrench className="h-4 w-4" />}
                    />
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-sm font-medium text-foreground">{tool.title}</span>
                    <span className="truncate text-xs text-muted-foreground">{tool.categoryName}</span>
                  </div>
                  <CornerDownLeft className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-data-[selected=true]:opacity-100" />
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {index.categories.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup heading="Categorias">
                {index.categories.map((category) => (
                  <CommandItem
                    key={category._id}
                    value={`Categoria ${category.name}`}
                    onSelect={() => navigate(`/ferramentas/${category.slug}`)}
                  >
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md"
                      style={{
                        background: `color-mix(in srgb, ${category.color || "hsl(217 91% 60%)"} 12%, transparent)`,
                        color: category.color || "hsl(217 91% 60%)",
                      }}
                      aria-hidden
                    >
                      <DynamicIcon
                        name={category.icon as IconName}
                        className="h-4 w-4"
                        fallback={() => <FolderOpen className="h-4 w-4" />}
                      />
                    </span>
                    <span className="text-sm font-medium text-foreground">{category.name}</span>
                    <span className="ml-auto text-xs text-muted-foreground">
                      {category.tools.length} {category.tools.length === 1 ? "ferramenta" : "ferramentas"}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}

          {index.posts.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup heading="Blog">
                {index.posts.map((post) => (
                  <CommandItem
                    key={post._id}
                    value={`Artigo ${post.title} ${post.excerpt} ${post.searchText}`}
                    onSelect={() => navigate(`/blog/${post.slug}`)}
                  >
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary"
                      aria-hidden
                    >
                      <BookOpen className="h-4 w-4" />
                    </span>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <span className="truncate text-sm font-medium text-foreground">{post.title}</span>
                      {post.excerpt && <span className="truncate text-xs text-muted-foreground">{post.excerpt}</span>}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}

          <CommandSeparator />
          <CommandGroup heading="Atalhos">
            <CommandItem value="Todas as ferramentas" onSelect={() => navigate("/ferramentas")}>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Wrench className="h-4 w-4" />
              </span>
              <span className="text-sm font-medium text-foreground">Ver todas as ferramentas</span>
              <ArrowRight className="ml-auto h-3.5 w-3.5 text-muted-foreground" />
            </CommandItem>
            <CommandItem value="Blog" onSelect={() => navigate("/blog")}>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                <BookOpen className="h-4 w-4" />
              </span>
              <span className="text-sm font-medium text-foreground">Ir para o Blog</span>
              <ArrowRight className="ml-auto h-3.5 w-3.5 text-muted-foreground" />
            </CommandItem>
          </CommandGroup>
        </CommandList>

        <div className="flex items-center justify-between gap-3 border-t border-border/60 px-3 py-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <kbd className="rounded border border-border/60 bg-background px-1.5 py-0.5 font-mono text-[10px]">↑</kbd>
              <kbd className="rounded border border-border/60 bg-background px-1.5 py-0.5 font-mono text-[10px]">↓</kbd>
              navegar
            </span>
            <span className="inline-flex items-center gap-1">
              <kbd className="rounded border border-border/60 bg-background px-1.5 py-0.5 font-mono text-[10px]">↵</kbd>
              abrir
            </span>
            <span className="inline-flex items-center gap-1">
              <kbd className="rounded border border-border/60 bg-background px-1.5 py-0.5 font-mono text-[10px]">esc</kbd>
              fechar
            </span>
          </div>
          <span className="hidden sm:inline">pdfs.com.br</span>
        </div>
      </CommandDialog>
    </>
  );
};
