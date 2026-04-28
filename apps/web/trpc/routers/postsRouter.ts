import z from "zod";
import { TRPCError } from "@trpc/server";
import { updateTag } from "next/cache";
import { mongoose, PostModel, type Ref, type Tool, ToolModel } from "@workspace/database";
import { PostStatus } from "@workspace/types";
import { PAGINATION } from "@/modules/common/constants";
import { baseProcedure, createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { createPostSchema, updatePostSchema } from "@/modules/dashboard/schema/post";

type PopulatedTool = { _id: { toString: () => string } } & Record<string, unknown>;

function serializeTool(tool: unknown) {
  if (tool && typeof tool === "object" && "_id" in tool) {
    const t = tool as PopulatedTool;
    return { ...t, _id: t._id.toString() };
  }
  return tool;
}

function serializePost<T extends { _id: { toString: () => string }; tools?: unknown[] }>(post: T) {
  return {
    ...post,
    _id: post._id.toString(),
    tools: post.tools?.map(serializeTool) ?? [],
  };
}

export const postsRouter = createTRPCRouter({
  list: baseProcedure
    .input(
      z.object({
        page: z.number().default(PAGINATION.DEFAULT_PAGE),
        pageSize: z.number().min(PAGINATION.MIN_PAGE_SIZE).max(PAGINATION.MAX_PAGE_SIZE).default(PAGINATION.DEFAULT_PAGE_SIZE),
        search: z.string().default(""),
        status: z.nativeEnum(PostStatus).optional(),
        toolId: z.string().optional(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { page, pageSize, search, status, toolId } = input;

      const match: mongoose.AnyObject = {};

      if (!ctx.session) {
        match.status = PostStatus.PUBLISHED;
        match.publishedAt = { $lte: new Date() };
      } else if (status) {
        match.status = status;
      }

      if (search) {
        match.$text = { $search: search };
      }

      if (toolId && mongoose.Types.ObjectId.isValid(toolId)) {
        match.tools = new mongoose.Types.ObjectId(toolId);
      }

      const [items, totalCount] = await Promise.all([
        PostModel.find(match)
          .populate("tools")
          .sort({ publishedAt: -1, createdAt: -1 })
          .skip((page - 1) * pageSize)
          .limit(pageSize)
          .lean(),
        PostModel.countDocuments(match),
      ]);

      const totalPages = Math.ceil(totalCount / pageSize);
      const hasNextPage = page < totalPages;
      const hasPreviousPage = page > 1;

      return {
        items: items.map((post) => serializePost(post as unknown as { _id: { toString: () => string }; tools?: unknown[] })),
        page,
        pageSize,
        totalCount,
        totalPages,
        hasNextPage,
        hasPreviousPage,
      };
    }),

  getBySlug: baseProcedure.input(z.object({ slug: z.string().min(1) })).query(async ({ input, ctx }) => {
    const post = await PostModel.findOne({ slug: input.slug }).populate("tools").lean();

    if (!post) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Post not found" });
    }

    if (!ctx.session) {
      const isVisible = post.status === PostStatus.PUBLISHED && !!post.publishedAt && post.publishedAt <= new Date();
      if (!isVisible) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Post not found" });
      }
    }

    return serializePost(post as unknown as { _id: { toString: () => string }; tools?: unknown[] });
  }),

  getByToolId: baseProcedure
    .input(
      z.object({
        toolId: z.string().min(1),
        page: z.number().default(PAGINATION.DEFAULT_PAGE),
        pageSize: z.number().min(PAGINATION.MIN_PAGE_SIZE).max(PAGINATION.MAX_PAGE_SIZE).default(PAGINATION.DEFAULT_PAGE_SIZE),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { toolId, page, pageSize } = input;

      if (!mongoose.Types.ObjectId.isValid(toolId)) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Invalid toolId" });
      }

      const match: mongoose.AnyObject = {
        tools: new mongoose.Types.ObjectId(toolId),
      };

      if (!ctx.session) {
        match.status = PostStatus.PUBLISHED;
        match.publishedAt = { $lte: new Date() };
      }

      const [items, totalCount] = await Promise.all([
        PostModel.find(match)
          .populate("tools")
          .sort({ publishedAt: -1, createdAt: -1 })
          .skip((page - 1) * pageSize)
          .limit(pageSize)
          .lean(),
        PostModel.countDocuments(match),
      ]);

      const totalPages = Math.ceil(totalCount / pageSize);
      const hasNextPage = page < totalPages;
      const hasPreviousPage = page > 1;

      return {
        items: items.map((post) => serializePost(post as unknown as { _id: { toString: () => string }; tools?: unknown[] })),
        page,
        pageSize,
        totalCount,
        totalPages,
        hasNextPage,
        hasPreviousPage,
      };
    }),

  getFeatured: baseProcedure.input(z.object({ limit: z.number().min(1).max(20).default(6) }).optional()).query(async ({ input }) => {
    const limit = input?.limit ?? 6;

    const match: mongoose.AnyObject = {
      isFeaturedGlobal: true,
      status: PostStatus.PUBLISHED,
      publishedAt: { $lte: new Date() },
    };

    const items = await PostModel.find(match).populate("tools").sort({ publishedAt: -1 }).limit(limit).lean();

    return items.map((post) => serializePost(post as unknown as { _id: { toString: () => string }; tools?: unknown[] }));
  }),

  getById: protectedProcedure.input(z.object({ id: z.string().min(1) })).query(async ({ input }) => {
    const post = await PostModel.findById(input.id).populate("tools").lean();

    if (!post) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Post not found" });
    }

    return serializePost(post as unknown as { _id: { toString: () => string }; tools?: unknown[] });
  }),

  create: protectedProcedure.input(createPostSchema).mutation(async ({ input }) => {
    const existing = await PostModel.findOne({ slug: input.slug });
    if (existing) {
      throw new TRPCError({ code: "CONFLICT", message: "A post with this slug already exists" });
    }

    const { toolIds, ...rest } = input;
    const tools = toolIds.map((id) => new mongoose.Types.ObjectId(id)) as unknown as Ref<Tool>[];

    const post = await PostModel.create({ ...rest, tools });

    updateTag("blog");
    if (post.slug) {
      updateTag(`blog:${post.slug}`);
    }

    const postObj = post.toObject();
    return { ...postObj, _id: postObj._id.toString() };
  }),

  update: protectedProcedure.input(updatePostSchema).mutation(async ({ input }) => {
    const post = await PostModel.findById(input.id);

    if (!post) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Post not found" });
    }

    const oldSlug = post.slug;

    if (input.slug !== oldSlug) {
      const existing = await PostModel.findOne({ slug: input.slug });
      if (existing) {
        throw new TRPCError({ code: "CONFLICT", message: "A post with this slug already exists" });
      }
    }

    post.title = input.title;
    post.slug = input.slug;
    post.excerpt = input.excerpt;
    post.coverImage = input.coverImage;
    post.content = input.content;
    post.status = input.status;
    post.publishedAt = input.publishedAt;
    post.isFeaturedGlobal = input.isFeaturedGlobal;
    post.tools = input.toolIds.map((id) => new mongoose.Types.ObjectId(id)) as unknown as Ref<Tool>[];
    post.seo = input.seo;

    await post.save();

    updateTag("blog");
    updateTag(`blog:${oldSlug}`);
    if (input.slug !== oldSlug) {
      updateTag(`blog:${input.slug}`);
    }

    const postObj = post.toObject();
    return { ...postObj, _id: postObj._id.toString() };
  }),

  delete: protectedProcedure.input(z.object({ id: z.string().min(1) })).mutation(async ({ input }) => {
    const post = await PostModel.findById(input.id);

    if (!post) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Post not found" });
    }

    const slug = post.slug;

    await PostModel.findByIdAndDelete(input.id);
    await ToolModel.updateMany({ featuredPostId: input.id }, { $unset: { featuredPostId: 1 } });

    updateTag("blog");
    updateTag(`blog:${slug}`);

    return { id: post._id.toString(), slug };
  }),
});
