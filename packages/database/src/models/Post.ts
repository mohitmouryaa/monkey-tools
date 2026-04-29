import "reflect-metadata";
import mongoose from "mongoose";
import { PostStatus } from "@workspace/types";
import { prop, getModelForClass, modelOptions, Severity, type Ref } from "@typegoose/typegoose";
import type { Tool } from "./Tool.js";

export class PostSeo {
  @prop()
  public title?: string;

  @prop()
  public description?: string;

  @prop()
  public ogImage?: string;
}

@modelOptions({
  schemaOptions: {
    timestamps: true,
    collection: "posts",
  },
  options: {
    allowMixed: Severity.ALLOW,
    customName: "Post",
  },
})
export class Post {
  public _id?: string;

  @prop({ required: true, minlength: 2 })
  public title!: string;

  @prop({ required: true, unique: true, index: true })
  public slug!: string;

  @prop({ required: true, minlength: 1 })
  public excerpt!: string;

  @prop({ required: true })
  public coverImage!: string;

  @prop({ type: () => Object, required: true })
  // biome-ignore lint/suspicious/noExplicitAny: <Editor.js JSON content shape is dynamic>
  public content!: Record<string, any>;

  @prop({ required: true, enum: PostStatus, index: true, default: PostStatus.DRAFT })
  public status!: PostStatus;

  @prop({ index: true })
  public publishedAt?: Date;

  @prop({ default: false })
  public isFeaturedGlobal!: boolean;

  @prop({ ref: "Tool", type: () => [mongoose.Schema.Types.ObjectId], default: [] })
  public tools!: Ref<Tool>[];

  @prop({ type: () => Object })
  public seo?: {
    title?: string;
    description?: string;
    ogImage?: string;
  };

  public createdAt?: Date;
  public updatedAt?: Date;
}

function getPostModel() {
  const model = (mongoose.models.Post as ReturnType<typeof getModelForClass<typeof Post>>) ?? getModelForClass(Post);

  model.schema.index({ status: 1, publishedAt: -1 });
  model.schema.index({ title: "text", excerpt: "text" });

  return model;
}

export const PostModel = getPostModel();
