"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@workspace/ui/components/form";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Switch } from "@workspace/ui/components/switch";
import { Label } from "@workspace/ui/components/label";
import { PageSeoFields } from "./page-seo-fields";
import { HeroSectionForm } from "./hero-section-form";
import { HowItWorksBuilder } from "./how-it-works-builder";
import { useUpdateHomepage } from "@/modules/dashboard/hooks/use-update-homepage";
import { updateHomepageSchema, type UpdateHomepageInput } from "@/modules/dashboard/schema/page";

interface HomepageFormProps {
  defaultValues?: Partial<UpdateHomepageInput>;
}

export const HomepageForm = ({ defaultValues }: HomepageFormProps) => {
  const updateHomepage = useUpdateHomepage();

  const form = useForm<UpdateHomepageInput>({
    resolver: zodResolver(updateHomepageSchema),
    defaultValues: defaultValues || {
      seoTitle: "",
      seoDescription: "",
      seoKeywords: "",
      heroSection: {
        badge: "",
        heading: "",
        description: "",
        primaryButtonText: "",
        primaryButtonLink: "",
        secondaryButtonText: "",
        secondaryButtonLink: "",
      },
      howItWorksSection: {
        title: "",
        subtitle: "",
        steps: [],
      },
      isActive: true,
    },
  });

  const onSubmit = (data: UpdateHomepageInput) => {
    updateHomepage.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <PageSeoFields form={form} />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <HeroSectionForm form={form} />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <HowItWorksBuilder form={form} />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={form.watch("isActive")}
                onCheckedChange={(checked) => form.setValue("isActive", checked)}
              />
              <Label htmlFor="isActive">Page is active</Label>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="submit" disabled={updateHomepage.isPending}>
            {updateHomepage.isPending ? "Saving..." : "Save Homepage"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
