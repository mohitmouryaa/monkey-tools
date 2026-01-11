import { createTRPCRouter } from "@/trpc/init";
import { toolsRouter } from "@/trpc/routers/toolsRouter";
import { jobsRouter } from "@/trpc/routers/jobsRouter";
import { categoriesRouter } from "@/trpc/routers/categoriesRouter";
import { pagesRouter } from "@/trpc/routers/pagesRouter";

export const appRouter = createTRPCRouter({
  jobs: jobsRouter,
  tools: toolsRouter,
  categories: categoriesRouter,
  pages: pagesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
