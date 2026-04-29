import z from "zod";
import { TRPCError } from "@trpc/server";
import { GlobalScriptModel } from "@workspace/database";
import { PAGINATION } from "@/modules/common/constants";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { createGlobalScriptSchema } from "@/modules/dashboard/schema/global-script";

export const globalScriptsRouter = createTRPCRouter({
  create: protectedProcedure.input(createGlobalScriptSchema).mutation(async ({ input }) => {
    try {
      const script = new GlobalScriptModel({
        ...input,
      });

      const savedScript = await script.save();
      const scriptObj = savedScript.toObject();

      return { ...scriptObj, _id: scriptObj._id.toString() };
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Failed to create script: ${error instanceof Error ? error.message : "Unknown error"}`,
      });
    }
  }),

  update: protectedProcedure.input(z.object({ id: z.string(), data: createGlobalScriptSchema })).mutation(async ({ input }) => {
    const { id, data } = input;
    try {
      const updatedScript = await GlobalScriptModel.findByIdAndUpdate(id, data, { new: true });
      if (!updatedScript) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Script not found" });
      }
      const scriptObj = updatedScript.toObject();
      return { ...scriptObj, _id: scriptObj._id.toString() };
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Failed to update script: ${error instanceof Error ? error.message : "Unknown error"}`,
      });
    }
  }),

  delete: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ input }) => {
    try {
      await GlobalScriptModel.findByIdAndDelete(input.id);
      return { success: true };
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Failed to delete script: ${error instanceof Error ? error.message : "Unknown error"}`,
      });
    }
  }),

  getMany: protectedProcedure
    .input(
      z.object({
        page: z.number().default(PAGINATION.DEFAULT_PAGE),
        pageSize: z.number().min(PAGINATION.MIN_PAGE_SIZE).max(PAGINATION.MAX_PAGE_SIZE).default(PAGINATION.DEFAULT_PAGE_SIZE),
        search: z.string().default(""),
        location: z.enum(["HEAD", "BODY"]).optional(),
        isActive: z.boolean().optional(),
      }),
    )
    .query(async ({ input }) => {
      const { page, pageSize, search, location, isActive } = input;

      const query: Record<string, unknown> = {};
      if (search) query.name = { $regex: search, $options: "i" };
      if (location) query.location = location;
      if (typeof isActive === "boolean") query.isActive = isActive;

      try {
        const [items, totalCount] = await Promise.all([
          GlobalScriptModel.find(query)
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .sort({ createdAt: -1 })
            .lean(),
          GlobalScriptModel.countDocuments(query),
        ]);

        const totalPages = Math.ceil(totalCount / pageSize);
        const hasNextPage = page < totalPages;
        const hasPreviousPage = page > 1;

        return {
          items: items.map((item) => ({
            ...item,
            _id: item._id.toString(),
          })),
          page,
          pageSize,
          totalCount,
          totalPages,
          hasNextPage,
          hasPreviousPage,
        };
      } catch {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch scripts",
        });
      }
    }),

  getById: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
    const item = await GlobalScriptModel.findById(input.id).lean();
    if (!item) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Script not found" });
    }
    return { ...item, _id: item._id.toString() };
  }),
});
