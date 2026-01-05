import z from "zod";
import { TRPCError } from "@trpc/server";
import { ToolModel } from "@workspace/database";
import { PAGINATION } from "@/modules/common/constants";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { createToolSchema } from "@/modules/dashboard/schema/tool";

export const toolsRouter = createTRPCRouter({
  create: protectedProcedure.input(createToolSchema).mutation(async ({ input, ctx }) => {
    try {
      const tool = new ToolModel({
        title: input.title,
        link: input.link,
        componentName: input.componentName,
        seoTitle: input.seoTitle,
        seoDescription: input.seoDescription,
        seoKeywords: input.seoKeywords,
        createdBy: ctx.auth.id,
        isActive: true,
      });

      const savedTool = await tool.save();
      const toolObj = savedTool.toObject();

      return { ...toolObj, _id: toolObj._id.toString() };
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Failed to create tool: ${error instanceof Error ? error.message : "Unknown error"}`,
      });
    }
  }),

  getMany: protectedProcedure
    .input(
      z.object({
        page: z.number().default(PAGINATION.DEFAULT_PAGE),
        pageSize: z.number().min(PAGINATION.MIN_PAGE_SIZE).max(PAGINATION.MAX_PAGE_SIZE).default(PAGINATION.DEFAULT_PAGE_SIZE),
        search: z.string().default(""),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { page, pageSize, search } = input;

      try {
        const searchRegex = new RegExp(search, "i");

        const [items, totalCount] = await Promise.all([
          ToolModel.find({
            createdBy: ctx.auth.id,
            isActive: true,
            title: { $regex: searchRegex },
          })
            .sort({ createdAt: -1 })
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .lean(),
          ToolModel.countDocuments({
            createdBy: ctx.auth.id,
            isActive: true,
            title: { $regex: searchRegex },
          }),
        ]);

        const totalPages = Math.ceil(totalCount / pageSize);
        const hasNextPage = page < totalPages;
        const hasPreviousPage = page > 1;

        return {
          items: items.map((tool) => ({
            ...tool,
            _id: tool._id.toString(),
          })),
          page,
          pageSize,
          totalCount,
          totalPages,
          hasNextPage,
          hasPreviousPage,
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Failed to fetch tools: ${error instanceof Error ? error.message : "Unknown error"}`,
        });
      }
    }),

  getOne: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
    try {
      const tool = await ToolModel.findById(input.id).lean();
      if (!tool) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Tool not found",
        });
      }

      return {
        success: true,
        tool: { ...tool, _id: tool._id.toString() },
      };
    } catch (error) {
      if (error instanceof TRPCError) throw error;
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Failed to fetch tool: ${error instanceof Error ? error.message : "Unknown error"}`,
      });
    }
  }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        data: createToolSchema.partial(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const tool = await ToolModel.findById(input.id);
        if (!tool) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Tool not found",
          });
        }

        // Check if user owns the tool or is admin
        if (tool.createdBy !== ctx.auth.id) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Unauthorized to update this tool",
          });
        }

        const updatedTool = await ToolModel.findByIdAndUpdate(input.id, { ...input.data }, { new: true }).lean();

        if (!updatedTool) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to update tool",
          });
        }

        return {
          success: true,
          tool: { ...updatedTool, _id: updatedTool._id.toString() },
          message: "Tool updated successfully",
        };
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Failed to update tool: ${error instanceof Error ? error.message : "Unknown error"}`,
        });
      }
    }),

  delete: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ input }) => {
    try {
      const tool = await ToolModel.findById(input.id);
      if (!tool) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Tool not found",
        });
      }

      await ToolModel.findByIdAndDelete(input.id);

      return {
        id: tool._id.toString(),
        title: tool.title,
      };
    } catch (error) {
      if (error instanceof TRPCError) throw error;
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Failed to delete tool: ${error instanceof Error ? error.message : "Unknown error"}`,
      });
    }
  }),
});
