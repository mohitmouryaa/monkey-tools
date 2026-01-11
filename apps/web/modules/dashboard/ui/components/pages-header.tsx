"use client";

import Link from "next/link";
import { Button } from "@workspace/ui/components/button";
import { Plus } from "lucide-react";

export const PagesHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">Pages</h1>
        <p className="text-muted-foreground mt-2">Manage your website pages (Homepage, All Tools, and custom pages)</p>
      </div>
      <Link href="/dashboard/pages/custom/create">
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Custom Page
        </Button>
      </Link>
    </div>
  );
};
