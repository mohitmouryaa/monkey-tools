"use client";

import Link from "next/link";
import { Button } from "@workspace/ui/components/button";
import { ArrowLeft } from "lucide-react";
import { AllToolsPageForm } from "../components/all-tools-page-form";
import { useAllToolsPage } from "../../hooks/use-all-tools-page";
import { Skeleton } from "@workspace/ui/components/skeleton";

export const EditAllToolsPageView = () => {
  const { data: page, isLoading } = useAllToolsPage();

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/pages">
          <Button variant="outline" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Edit All Tools Page</h1>
          <p className="text-muted-foreground mt-2">Configure your all tools page content and settings</p>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-64 w-full" />
        </div>
      ) : page ? (
        <AllToolsPageForm
          defaultValues={{
            seoTitle: page.seoTitle,
            seoDescription: page.seoDescription,
            seoKeywords: page.seoKeywords,
            h1Heading: page.h1Heading,
            shortDescription: page.shortDescription,
            isActive: page.isActive,
          }}
        />
      ) : (
        <div className="text-center py-12 text-muted-foreground">All Tools page not found. It will be created when you save.</div>
      )}
    </div>
  );
};
