import z from "zod";
import { TRPCError } from "@trpc/server";
import { PAGINATION } from "@/modules/common/constants";
import { type Category, type Tool, ToolModel } from "@workspace/database";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { createToolSchema } from "@/modules/dashboard/schema/tool";

export type ToolWithCategory = Tool & { category: Category };

export const toolsRouter = createTRPCRouter({
  create: protectedProcedure.input(createToolSchema).mutation(async ({ input }) => {
    try {
      const tool = new ToolModel({
        title: input.title,
        link: input.link,
        componentName: input.componentName,
        description: input.description,
        category: input.categoryId,
        icon: input.icon,
        iconColor: input.iconColor,
        bgColor: input.bgColor,
        seoTitle: input.seoTitle,
        seoDescription: input.seoDescription,
        seoKeywords: input.seoKeywords,
        h1Heading: input.h1Heading,
        introText: input.introText,
        stepsTitle: input.stepsTitle,
        visualSteps: input.visualSteps,
        richContent: input.richContent,
        faqs: input.faqs,
        closingText: input.closingText,
        isActive: input.isActive ?? true,
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
    .query(async ({ input }) => {
      const { page, pageSize, search } = input;
      const searchRegex = new RegExp(search, "i");

      const [items, totalCount] = await Promise.all([
        ToolModel.aggregate([
          {
            $match: {
              isActive: true,
              title: { $regex: searchRegex },
            },
          },
          {
            $lookup: {
              from: "categories",
              localField: "category",
              foreignField: "_id",
              as: "category",
            },
          },
          {
            $unwind: {
              path: "$category",
              preserveNullAndEmptyArrays: true,
            },
          },
          { $sort: { createdAt: -1 } },
          { $skip: (page - 1) * pageSize },
          { $limit: pageSize },
        ]),
        ToolModel.countDocuments({
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
          category:
            tool.category && typeof tool.category === "object" && "_id" in tool.category
              ? { ...tool.category, _id: tool.category._id?.toString() || "" }
              : null,
        })) as unknown as ToolWithCategory[],
        page,
        pageSize,
        totalCount,
        totalPages,
        hasNextPage,
        hasPreviousPage,
      };
    }),

  getOne: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
    try {
      const tool = await ToolModel.findById(input.id).populate("category").lean();
      if (!tool) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Tool not found",
        });
      }

      return {
        ...tool,
        _id: tool._id.toString(),
        category: tool.category ? { ...(tool.category as Category), _id: (tool.category as Category)?._id?.toString() } : null,
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
    .mutation(async ({ input }) => {
      try {
        const tool = await ToolModel.findById(input.id);
        if (!tool) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Tool not found",
          });
        }

        // Build update object with $set operator to ensure new fields are created
        const updateData: any = {};
        
        if (input.data.title !== undefined) updateData.title = input.data.title;
        if (input.data.link !== undefined) updateData.link = input.data.link;
        if (input.data.componentName !== undefined) updateData.componentName = input.data.componentName;
        if (input.data.description !== undefined) updateData.description = input.data.description;
        if (input.data.categoryId !== undefined) updateData.category = input.data.categoryId;
        if (input.data.icon !== undefined) updateData.icon = input.data.icon;
        if (input.data.iconColor !== undefined) updateData.iconColor = input.data.iconColor;
        if (input.data.bgColor !== undefined) updateData.bgColor = input.data.bgColor;
        if (input.data.seoTitle !== undefined) updateData.seoTitle = input.data.seoTitle;
        if (input.data.seoDescription !== undefined) updateData.seoDescription = input.data.seoDescription;
        if (input.data.seoKeywords !== undefined) updateData.seoKeywords = input.data.seoKeywords;
        if (input.data.h1Heading !== undefined) updateData.h1Heading = input.data.h1Heading;
        if (input.data.introText !== undefined) updateData.introText = input.data.introText;
        if (input.data.stepsTitle !== undefined) updateData.stepsTitle = input.data.stepsTitle;
        if (input.data.visualSteps !== undefined) updateData.visualSteps = input.data.visualSteps;
        if (input.data.richContent !== undefined) updateData.richContent = input.data.richContent;
        if (input.data.faqs !== undefined) updateData.faqs = input.data.faqs;
        if (input.data.closingText !== undefined) updateData.closingText = input.data.closingText;
        if (input.data.isActive !== undefined) updateData.isActive = input.data.isActive;

        console.log("Update data stepsTitle:", input.data.stepsTitle, "->", updateData.stepsTitle);

        // Use updateOne with $set to ensure fields are created
        await ToolModel.updateOne(
          { _id: input.id },
          { $set: updateData }
        );

        // Fetch the updated document with all fields
        const updatedTool = await ToolModel.findById(input.id).lean().exec();

        if (!updatedTool) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to update tool",
          });
        }

        console.log("Updated tool stepsTitle:", updatedTool.stepsTitle);
        console.log("Updated tool keys:", Object.keys(updatedTool));

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
