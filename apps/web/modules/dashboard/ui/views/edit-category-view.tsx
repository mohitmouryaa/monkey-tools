"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { DashboardBreadcrumb } from "@/modules/common/ui/components/dashboard-breadcrumb";
import type { CategoryFormValues } from "@/modules/dashboard/schema/category";
import { CategoryForm } from "@/modules/dashboard/ui/components/category-form";
import { useUpdateCategory } from "@/modules/dashboard/hooks/use-update-category";
import type { CategoryDto } from "@/modules/dashboard/ui/views/category-view";

interface EditCategoryViewProps {
  category: CategoryDto;
}

export const EditCategoryView = ({ category }: EditCategoryViewProps) => {
  const router = useRouter();
  const updateCategory = useUpdateCategory();

  const id = category._id;
  const publicUrl = category.slug ? `/ferramentas/${category.slug}` : "";
  const detailHref = `/dashboard/categories/${id}`;

  const handleUpdate = (values: CategoryFormValues) => {
    updateCategory.mutate(
      { id, data: values },
      {
        onSuccess: () => {
          router.push(detailHref);
        },
      },
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <DashboardBreadcrumb
          className="mb-6"
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Categorias", href: "/dashboard/categories" },
            { label: category.name, href: detailHref },
            { label: "Editar" },
          ]}
        />

        <header className="flex flex-col gap-4 pb-6 mb-8 border-b sm:flex-row sm:items-end sm:justify-between border-border/50">
          <div className="flex items-center gap-4">
            <Link
              href={detailHref}
              className="flex items-center justify-center transition-all rounded-lg group size-10 hover:bg-muted"
              aria-label="Voltar"
            >
              <ArrowLeft className="w-5 h-5 transition-colors text-muted-foreground group-hover:text-foreground" />
            </Link>
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl text-foreground">Editar categoria</h2>
                <Badge variant="secondary" className="font-normal">
                  {category.name}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">Alterações salvas atualizam o site público imediatamente.</p>
            </div>
          </div>

          {publicUrl && (
            <Button asChild variant="outline" size="sm" className="gap-2">
              <Link href={publicUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4" />
                Ver ao vivo
              </Link>
            </Button>
          )}
        </header>

        <CategoryForm
          defaultValues={{
            name: category.name,
            slug: category.slug,
            description: category.description || "",
            icon: category.icon || "folder",
            color: category.color || "#6366f1",
            isActive: category.isActive ?? true,
          }}
          onSubmit={handleUpdate}
          onCancel={() => router.push(detailHref)}
          submitLabel="Salvar alterações"
          disabled={updateCategory.isPending}
        />
      </div>
    </div>
  );
};
