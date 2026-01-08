import { Suspense } from "react";
import { caller } from "@/trpc/server";
import { ToolLoading } from "@/modules/common/ui/components/tool-loading";
import { PDFLibProvider } from "@/modules/common/providers/pdf-lib-provider";
import { InvalidToolSelection } from "@/modules/common/ui/components/invalid-tool-selection";
import { ToolSteps } from "@/modules/tools/ui/components/tool-steps";
import { ToolFAQ } from "@/modules/tools/ui/components/tool-faq";
import { FAQSchema } from "@/modules/tools/ui/components/faq-schema";

interface ToolViewProps {
  toolCategory: string;
  tool: string;
}

export const ToolView = async ({ toolCategory, tool }: ToolViewProps) => {
  if (!toolCategory || !tool) {
    return <InvalidToolSelection />;
  }

  // Fetch tool data from database
  const category = await caller.categories.getCategoryWithTools({ slug: toolCategory });
  const toolData = category.tools.find((t) => t.link === tool);

  if (!toolData) {
    return <InvalidToolSelection />;
  }

  try {
    const { default: ToolComponent } = await import(`@/modules/tools/ui/components/${tool}`);

    return (
      <div className="container mx-auto px-4 py-12">
        {/* H1 + Intro */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{toolData.h1Heading || toolData.title}</h1>
          {toolData.introText && (
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">{toolData.introText}</p>
          )}
        </div>

        {/* Tool Component - heading/description removed from individual components */}
        <Suspense fallback={<ToolLoading />}>
          <PDFLibProvider>
            <ToolComponent />
          </PDFLibProvider>
        </Suspense>

        {/* Visual Steps */}
        {toolData.visualSteps && toolData.visualSteps.length > 0 && (
          <section className="my-16">
            <h2 className="text-3xl font-bold text-center mb-8">{toolData.stepsTitle || `How to use ${toolData.title}`}</h2>
            <ToolSteps steps={toolData.visualSteps} />
          </section>
        )}

        {/* Rich Content */}
        {toolData.richContent && (
          <>
            <hr className="my-16 border-t border-border/40" />
            <section className="max-w-4xl mx-auto my-20">
              <div
                className="prose prose-lg dark:prose-invert max-w-none 
                  [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-4
                  [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-3
                  [&_p]:text-base [&_p]:my-4 [&_p]:leading-relaxed
                  [&_ul]:!list-disc [&_ul]:!pl-8 [&_ul]:!my-4 
                  [&_ol]:!list-decimal [&_ol]:!pl-8 [&_ol]:!my-4 
                  [&_li]:!my-2 [&_li]:!list-item
                  [&_strong]:font-bold [&_em]:italic
                  [&_a]:text-primary [&_a]:underline"
                // biome-ignore lint/security/noDangerouslySetInnerHtml: Content is from trusted admin
                dangerouslySetInnerHTML={{ __html: toolData.richContent }}
              />
            </section>
            <hr className="my-16 border-t border-border/40" />
          </>
        )}

        {/* FAQs */}
        {toolData.faqs && toolData.faqs.length > 0 && (
          <section className="my-16 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <ToolFAQ faqs={toolData.faqs} />
            <FAQSchema faqs={toolData.faqs} />
          </section>
        )}

        {/* Closing Text */}
        {toolData.closingText && (
          <section className="my-16 text-center max-w-3xl mx-auto">
            <p className="text-lg text-muted-foreground leading-relaxed">{toolData.closingText}</p>
          </section>
        )}
      </div>
    );
  } catch {
    return <InvalidToolSelection />;
  }
};
