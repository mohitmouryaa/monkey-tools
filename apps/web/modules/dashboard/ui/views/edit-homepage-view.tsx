"use client";

import Link from "next/link";
import { Button } from "@workspace/ui/components/button";
import { ArrowLeft } from "lucide-react";
import { HomepageForm } from "../components/homepage-form";
import { useHomepage } from "../../hooks/use-homepage";
import { Skeleton } from "@workspace/ui/components/skeleton";

export const EditHomepageView = () => {
  const { data: page, isLoading } = useHomepage();

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/pages">
          <Button variant="outline" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Edit Homepage</h1>
          <p className="text-muted-foreground mt-2">Configure your homepage content and settings</p>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      ) : page ? (
        <HomepageForm
          defaultValues={{
            seoTitle: page.seoTitle,
            seoDescription: page.seoDescription,
            seoKeywords: page.seoKeywords,
            heroSection: page.heroSection,
            howItWorksSection: page.howItWorksSection,
            isActive: page.isActive,
          }}
        />
      ) : (
        <div className="text-center py-12 text-muted-foreground">Homepage not found. It will be created when you save.</div>
      )}
    </div>
  );
};
