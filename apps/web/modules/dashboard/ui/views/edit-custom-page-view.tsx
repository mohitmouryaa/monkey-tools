"use client";

import Link from "next/link";
import { Button } from "@workspace/ui/components/button";
import { ArrowLeft } from "lucide-react";
import { EditCustomPageForm } from "../components/edit-custom-page-form";
import { usePageById } from "../../hooks/use-page-by-id";
import type { UpdateCustomPageFormValues } from "../../schema/page";
import { Skeleton } from "@workspace/ui/components/skeleton";

interface EditCustomPageViewProps {
  pageId: string;
}

export const EditCustomPageView = ({ pageId }: EditCustomPageViewProps) => {
  const { data: page, isLoading } = usePageById(pageId);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/pages">
          <Button variant="outline" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Edit Custom Page</h1>
          <p className="text-muted-foreground mt-2">Update your custom page content and settings</p>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      ) : page ? (
        <EditCustomPageForm
          defaultValues={{
            id: page._id,
            title: page.title || "",
            slug: page.slug,
            seoTitle: page.seoTitle,
            seoDescription: page.seoDescription,
            seoKeywords: page.seoKeywords,
            content: (page.content ?? "") as UpdateCustomPageFormValues["content"] | string,
            showInFooter: page.showInFooter ?? true,
            footerOrder: page.footerOrder ?? 0,
            footerLabel: page.footerLabel || "",
            isActive: page.isActive,
          }}
        />
      ) : (
        <div className="text-center py-12 text-muted-foreground">Page not found</div>
      )}
    </div>
  );
};
