import { createTRPCRouter } from "@/trpc/init";
import { toolsRouter } from "@/trpc/routers/toolsRouter";
import { jobsRouter } from "@/trpc/routers/jobsRouter";
import { categoriesRouter } from "@/trpc/routers/categoriesRouter";
import { pagesRouter } from "@/trpc/routers/pagesRouter";
import { postsRouter } from "@/trpc/routers/postsRouter";
import { globalScriptsRouter } from "@/trpc/routers/globalScriptsRouter";
import { dashboardRouter } from "@/trpc/routers/dashboardRouter";

export const appRouter = createTRPCRouter({
  jobs: jobsRouter,
  tools: toolsRouter,
  categories: categoriesRouter,
  pages: pagesRouter,
  posts: postsRouter,
  globalScripts: globalScriptsRouter,
  dashboard: dashboardRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
