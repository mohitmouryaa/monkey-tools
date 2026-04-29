"use client";

import Link from "next/link";
import { Button } from "@workspace/ui/components/button";
import { ArrowLeft } from "lucide-react";
import { CreateCustomPageForm } from "../components/create-custom-page-form";

export const CreateCustomPageView = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/pages">
          <Button variant="outline" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Criar Página Personalizada</h1>
          <p className="text-muted-foreground mt-2">Crie uma nova página personalizada para seu site</p>
        </div>
      </div>

      <CreateCustomPageForm />
    </div>
  );
};
