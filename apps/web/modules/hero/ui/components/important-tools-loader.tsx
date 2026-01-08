import { ImportantToolsSection } from "./important-tools-section";

interface ImportantToolsLoaderProps {
  // biome-ignore lint/suspicious/noExplicitAny: <Transient types>
  toolsPromise: Promise<any>;
  // biome-ignore lint/suspicious/noExplicitAny: <Transient types>
  categoriesPromise: Promise<any>;
}

export const ImportantToolsLoader = async ({ toolsPromise, categoriesPromise }: ImportantToolsLoaderProps) => {
  const [tools, categories] = await Promise.all([toolsPromise, categoriesPromise]);

  return <ImportantToolsSection initialTools={tools} categories={categories} />;
};
