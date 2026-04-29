import z from "zod";
import { TRPCError } from "@trpc/server";
import { CategoryModel, PostModel, ToolModel } from "@workspace/database";
import { PostStatus } from "@workspace/types";
import { PAGINATION } from "@/modules/common/constants";
import { baseProcedure, createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { createCategorySchema } from "@/modules/dashboard/schema/category";

// biome-ignore lint/suspicious/noExplicitAny: Editor.js content shape varia por bloco
function extractPostSearchText(content: any, seo?: { description?: string }): string {
  const parts: string[] = [];
  if (seo?.description) parts.push(seo.description);

  const blocks = Array.isArray(content?.blocks) ? content.blocks : [];
  for (const block of blocks) {
    const data = block?.data ?? {};
    if (typeof data.text === "string") parts.push(data.text);
    if (typeof data.caption === "string") parts.push(data.caption);
    if (Array.isArray(data.items)) {
      for (const item of data.items) {
        if (typeof item === "string") parts.push(item);
        else if (typeof item?.content === "string") parts.push(item.content);
      }
    }
  }

  // Strip HTML tags + collapse whitespace + cap em ~800 chars (suficiente pra match, leve no payload)
  return parts
    .join(" ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 800);
}

export const categoriesRouter = createTRPCRouter({
  create: protectedProcedure.input(createCategorySchema).mutation(async ({ input }) => {
    try {
      const category = new CategoryModel({
        name: input.name,
        slug: input.slug,
        description: input.description,
        icon: input.icon,
        color: input.color,
        isActive: true,
      });

      const savedCategory = await category.save();
      const categoryObj = savedCategory.toObject();

      return { ...categoryObj, _id: categoryObj._id.toString() };
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Falha ao criar categoria: ${error instanceof Error ? error.message : "Erro desconhecido"}`,
      });
    }
  }),

  getMany: baseProcedure
    .input(
      z.object({
        page: z.number().default(PAGINATION.DEFAULT_PAGE),
        pageSize: z.number().min(PAGINATION.MIN_PAGE_SIZE).max(PAGINATION.MAX_PAGE_SIZE).default(PAGINATION.DEFAULT_PAGE_SIZE),
        search: z.string().default(""),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { page, pageSize, search } = input;
      const searchRegex = new RegExp(search, "i");

      // Use aggregation pipeline for better performance - single query with join
      const isActiveFilter = ctx.session ? {} : { isActive: true };
      const matchStage = {
        name: { $regex: searchRegex },
        ...isActiveFilter,
      };

      const [items, totalCount] = await Promise.all([
        CategoryModel.aggregate([
          {
            $match: matchStage,
          },
          {
            $lookup: {
              from: "tools",
              localField: "_id",
              foreignField: "category",
              as: "tools",
            },
          },
          {
            $addFields: {
              toolsCount: { $size: "$tools" },
            },
          },
          {
            $project: {
              tools: 0, // Remove tools array, keep only count
            },
          },
          { $sort: { createdAt: 1 } },
          { $skip: (page - 1) * pageSize },
          { $limit: pageSize },
        ]),
        CategoryModel.countDocuments(matchStage),
      ]);

      const totalPages = Math.ceil(totalCount / pageSize);
      const hasNextPage = page < totalPages;
      const hasPreviousPage = page > 1;

      return {
        items: items.map((category) => ({
          ...category,
          _id: category._id.toString(),
        })),
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
      const category = await CategoryModel.findById(input.id).lean();
      if (!category) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Categoria não encontrada",
        });
      }

      return {
        ...category,
        _id: category._id.toString(),
      };
    } catch (error) {
      if (error instanceof TRPCError) throw error;
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Falha ao buscar categoria: ${error instanceof Error ? error.message : "Erro desconhecido"}`,
      });
    }
  }),

  getSearchIndex: baseProcedure.query(async () => {
    const [categories, posts] = await Promise.all([
      CategoryModel.aggregate([
        { $match: { isActive: true } },
        { $sort: { name: 1 } },
        {
          $lookup: {
            from: "tools",
            let: { categoryId: "$_id" },
            pipeline: [
              { $match: { $expr: { $and: [{ $eq: ["$category", "$$categoryId"] }, { $eq: ["$isActive", true] }] } } },
              { $sort: { title: 1 } },
              { $project: { _id: 1, title: 1, link: 1, description: 1, icon: 1, seoKeywords: 1 } },
            ],
            as: "tools",
          },
        },
        { $project: { _id: 1, name: 1, slug: 1, icon: 1, color: 1, tools: 1 } },
      ]),
      PostModel.find({ status: PostStatus.PUBLISHED, publishedAt: { $lte: new Date() } })
        .sort({ publishedAt: -1 })
        .limit(20)
        .select("_id title slug excerpt content seo")
        .lean(),
    ]);

    return {
      categories: categories.map((category) => ({
        _id: category._id.toString(),
        name: category.name,
        slug: category.slug,
        icon: category.icon,
        color: category.color,
        tools: (category.tools ?? []).map(
          (tool: { _id: unknown; title: string; link: string; description?: string; icon?: string; seoKeywords?: string }) => ({
            _id: String(tool._id),
            title: tool.title,
            link: tool.link,
            description: tool.description ?? "",
            icon: tool.icon ?? "",
            seoKeywords: tool.seoKeywords ?? "",
          }),
        ),
      })),
      posts: posts.map((post) => ({
        _id: post._id.toString(),
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt ?? "",
        searchText: extractPostSearchText(post.content, post.seo),
      })),
    };
  }),

  getAllForNav: baseProcedure.query(async () => {
    const categories = await CategoryModel.aggregate([
      { $match: { isActive: true } },
      { $sort: { createdAt: 1 } },
      {
        $lookup: {
          from: "tools",
          let: { categoryId: "$_id" },
          pipeline: [
            { $match: { $expr: { $and: [{ $eq: ["$category", "$$categoryId"] }, { $eq: ["$isActive", true] }] } } },
            { $sort: { title: 1 } },
            { $limit: 8 },
            { $project: { _id: 1, title: 1, link: 1, icon: 1, iconColor: 1, bgColor: 1 } },
          ],
          as: "tools",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          slug: 1,
          icon: 1,
          color: 1,
          description: 1,
          tools: 1,
        },
      },
    ]);

    return categories.map((category) => ({
      ...category,
      _id: category._id.toString(),
      tools: (category.tools ?? []).map((tool: { _id: unknown }) => ({
        ...tool,
        _id: String(tool._id),
      })),
    }));
  }),

  getCategoryWithTools: baseProcedure.input(z.object({ slug: z.string() })).query(async ({ input }) => {
    const category = await CategoryModel.findOne({ slug: input.slug }).lean();
    if (!category) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Categoria não encontrada",
      });
    }

    const tools = await ToolModel.find({ category: category._id, isActive: true }).lean();

    return {
      ...category,
      tools: tools.map((tool) => ({
        ...tool,
        category: tool.category.toString(),
        _id: tool._id.toString(),
      })),
      _id: category._id.toString(),
    };
  }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        data: createCategorySchema.partial(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const category = await CategoryModel.findById(input.id);
        if (!category) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Categoria não encontrada",
          });
        }

        const updatedCategory = await CategoryModel.findByIdAndUpdate(input.id, { ...input.data }, { new: true }).lean();

        if (!updatedCategory) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Falha ao atualizar categoria",
          });
        }

        return {
          success: true,
          category: { ...updatedCategory, _id: updatedCategory._id.toString() },
          message: "Categoria atualizada com sucesso",
        };
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Falha ao atualizar categoria: ${error instanceof Error ? error.message : "Erro desconhecido"}`,
        });
      }
    }),

  delete: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ input }) => {
    try {
      const category = await CategoryModel.findById(input.id);

      if (category) {
        await CategoryModel.findByIdAndDelete(input.id);
        return {
          id: category._id.toString(),
          name: category.name,
        };
      } else {
        return {
          id: input.id,
          name: "Categoria não encontrada",
        };
      }
    } catch (error) {
      if (error instanceof TRPCError) throw error;
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Falha ao excluir categoria: ${error instanceof Error ? error.message : "Erro desconhecido"}`,
      });
    }
  }),
});
