import { Suspense } from "react";
import { unstable_cache } from "next/cache";
import { caller } from "@/trpc/server";
import { tagForTool } from "@/modules/tools/lib/cache";
import { ToolSteps } from "@/modules/tools/ui/components/tool-steps";
import { ToolFAQ } from "@/modules/tools/ui/components/tool-faq";
import { FAQSchema } from "@/modules/tools/ui/components/faq-schema";
import { RelatedTools } from "@/modules/tools/ui/components/related-tools";
import { SoftwareSchema } from "@/modules/tools/ui/components/software-schema";
import { BreadcrumbSchema } from "@/modules/tools/ui/components/breadcrumb-schema";
import { ToolHeader } from "@/modules/tools/ui/components/tool-header";
import { ToolLoading } from "@/modules/common/ui/components/tool-loading";
import { PDFLibProvider } from "@/modules/common/providers/pdf-lib-provider";
import { InvalidToolSelection } from "@/modules/common/ui/components/invalid-tool-selection";
import { AdPlaceholder } from "@/modules/common/ui/components/ad-placeholder";
import { PostCard } from "@/modules/blog/ui/components/post-card";

interface ToolViewProps {
  toolCategory: string;
  tool: string;
}

interface FeaturedPostSummary {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  publishedAt?: string | Date | null;
  tools?: Array<{ _id: string; title: string }>;
}

export const ToolView = async ({ toolCategory, tool }: ToolViewProps) => {
  if (!toolCategory || !tool) {
    return <InvalidToolSelection />;
  }

  // Fetch tool data from database
  const category = await unstable_cache(
    async () => caller.categories.getCategoryWithTools({ slug: toolCategory }),
    ["tool-category-with-tools-v1", toolCategory, tool],
    { revalidate: 3600, tags: [tagForTool(tool)] },
  )();
  const toolData = category.tools.find((t) => [`/${tool}`, tool].includes(t.link));

  if (!toolData) {
    return <InvalidToolSelection />;
  }

  let featuredPost: FeaturedPostSummary | null = null;
  if (toolData.featuredPostId) {
    try {
      const result = await caller.posts.getByIdPublic({ id: String(toolData.featuredPostId) });
      featuredPost = result as unknown as FeaturedPostSummary;
    } catch {
      featuredPost = null;
    }
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://pdfs.com.br";
    const currentUrl = `${baseUrl}/ferramentas/${toolCategory}/${tool}`;

    const { default: ToolComponent } = await import(`@/modules/tools/ui/components/${tool}`);

    return (
      <div className="container px-4 py-8 mx-auto">
        {/* Schemas */}
        <SoftwareSchema tool={toolData} url={currentUrl} />
        <BreadcrumbSchema
          items={[
            { name: "Home", url: baseUrl },
            { name: category.name, url: `${baseUrl}/ferramentas/${toolCategory}` },
            { name: toolData.title, url: currentUrl },
          ]}
        />

        {/* Ad - Top */}
        <div className="mb-6">
          <AdPlaceholder position="top" />
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Main Content */}
          <div className="flex-1">
            {/* Tool Header */}
            <ToolHeader
              title={toolData.h1Heading || toolData.title}
              introText={toolData.introText || undefined}
              iconName={toolData.icon || undefined}
            />

            {/* Tool Card */}
            <div className="p-6 mb-8 border rounded-lg bg-card border-border md:p-8">
              <Suspense fallback={<ToolLoading />}>
                <PDFLibProvider>
                  <ToolComponent />
                </PDFLibProvider>
              </Suspense>
            </div>

            {/* Visual Steps */}
            {toolData.visualSteps && toolData.visualSteps.length > 0 && (
              <div className="mb-8">
                <h2 className="mb-6 text-2xl font-bold">{toolData.stepsTitle || `Como usar ${toolData.title}`}</h2>
                <ToolSteps steps={toolData.visualSteps} />
              </div>
            )}

            {/* SEO Content */}
            {toolData.richContent && (
              <div className="mb-8">
                <div className="p-6 border rounded-lg bg-card border-border">
                  <div
                    className="prose prose-lg dark:prose-invert max-w-none 
                      [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-4
                      [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-3
                      [&_p]:text-base [&_p]:my-3 [&_p]:leading-relaxed
                      [&_ul]:list-disc! [&_ul]:pl-6! [&_ul]:my-3! 
                      [&_ol]:list-decimal! [&_ol]:pl-6! [&_ol]:my-3! 
                      [&_li]:my-1.5! [&_li]:list-item!
                      [&_strong]:font-semibold [&_em]:italic
                      [&_a]:text-primary [&_a]:underline"
                    // biome-ignore lint/security/noDangerouslySetInnerHtml: Content is from trusted admin
                    dangerouslySetInnerHTML={{ __html: toolData.richContent }}
                  />
                </div>
              </div>
            )}

            {/* Aprenda mais */}
            {featuredPost && (
              <div className="mb-8">
                <h2 className="mb-6 text-2xl font-bold">Aprenda mais</h2>
                <div className="grid grid-cols-1 gap-6 md:max-w-md">
                  <PostCard post={featuredPost} />
                </div>
              </div>
            )}

            {/* FAQs */}
            {toolData.faqs && toolData.faqs.length > 0 && (
              <div className="mb-8">
                <h2 className="mb-6 text-2xl font-bold">Perguntas Frequentes</h2>
                <ToolFAQ faqs={toolData.faqs} />
                <FAQSchema faqs={toolData.faqs} />
              </div>
            )}

            {/* Closing Text */}
            {toolData.closingText && (
              <div className="mb-8">
                <div className="p-6 border rounded-lg bg-card border-border">
                  <p className="text-base leading-relaxed text-muted-foreground">{toolData.closingText}</p>
                </div>
              </div>
            )}

            {/* Related Tools */}
            <RelatedTools currentToolId={toolData._id as string} tools={category.tools} categorySlug={toolCategory} />
          </div>

          {/* Sidebar - Desktop Only */}
          <div className="hidden lg:block w-72">
            <div className="sticky top-24">
              <AdPlaceholder position="sidebar" />
            </div>
          </div>
        </div>

        {/* Ad - Bottom */}
        <div className="mt-8">
          <AdPlaceholder position="bottom" />
        </div>
      </div>
    );
  } catch {
    return <InvalidToolSelection />;
  }
};
