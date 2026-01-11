"use client";

import type { UseFormReturn } from "react-hook-form";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import type { UpdateHomepageInput } from "@/modules/dashboard/schema/page";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@workspace/ui/components/form";

interface HeroSectionFormProps {
  form: UseFormReturn<UpdateHomepageInput>;
}

export const HeroSectionForm = ({ form }: HeroSectionFormProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Hero Section</h3>
        <p className="text-sm text-muted-foreground">Configure the main hero section of the homepage</p>
      </div>

      <FormField
        control={form.control}
        name="heroSection.badge"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Badge Text</FormLabel>
            <FormControl>
              <Input placeholder="e.g., New Feature" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="heroSection.heading"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Main Heading</FormLabel>
            <FormControl>
              <Textarea placeholder="Enter main heading" rows={2} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="heroSection.description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea placeholder="Enter hero description" rows={3} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="heroSection.primaryButtonText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primary Button Text</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Get Started" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="heroSection.primaryButtonLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primary Button Link</FormLabel>
              <FormControl>
                <Input placeholder="/tools" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="heroSection.secondaryButtonText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Secondary Button Text</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Learn More" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="heroSection.secondaryButtonLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Secondary Button Link</FormLabel>
              <FormControl>
                <Input placeholder="/about" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
