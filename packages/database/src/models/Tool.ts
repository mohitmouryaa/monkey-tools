import "reflect-metadata";
import mongoose from "mongoose";
import { Category } from "./Category.js";
import type { Post } from "./Post.js";
import { prop, getModelForClass, modelOptions, Severity, type Ref } from "@typegoose/typegoose";

@modelOptions({
  schemaOptions: {
    timestamps: true,
    collection: "tools",
  },
  options: {
    allowMixed: Severity.ALLOW,
    customName: "Tool",
  },
})
export class Tool {
  public _id?: string;

  @prop({ required: true, minlength: 2 })
  public title!: string;

  @prop({ required: true, unique: true, index: true })
  public link!: string;

  @prop({ required: true, minlength: 2 })
  public componentName!: string;

  @prop({ required: true })
  public description!: string;

  @prop({ ref: () => Category, required: true })
  public category!: Ref<Category>;

  // Visual properties
  @prop({ required: true })
  public icon!: string;

  @prop({ required: true })
  public iconColor!: string;

  @prop({ required: true })
  public bgColor!: string;

  // SEO properties
  @prop({ required: true })
  public seoTitle!: string;

  @prop({ required: true })
  public seoDescription!: string;

  @prop({ required: true })
  public seoKeywords!: string;

  // Page Content
  @prop({ default: "" })
  public h1Heading?: string;

  @prop({ default: "" })
  public introText?: string;

  @prop({ default: "" })
  public stepsTitle?: string;

  @prop({ type: () => [Object], default: [] })
  public visualSteps?: Array<{
    icon: string;
    title: string;
    description: string;
    iconColor?: string;
    bgColor?: string;
  }>;

  @prop({ default: "" })
  public richContent?: string;

  @prop({ type: () => [Object], default: [] })
  public faqs?: Array<{
    question: string;
    answer: string;
  }>;

  @prop({ default: "" })
  public closingText?: string;

  // YouTube tutorial fields (optional)
  @prop()
  public videoId?: string;

  @prop()
  public videoTitle?: string;

  @prop()
  public videoDescription?: string;

  @prop()
  public videoThumbnailUrl?: string;

  @prop()
  public videoUploadDate?: Date;

  @prop()
  public videoDurationISO?: string;

  @prop({ default: true })
  public isActive!: boolean;

  @prop({ ref: "Post", type: () => mongoose.Schema.Types.ObjectId, default: null })
  public featuredPostId?: Ref<Post> | null;

  @prop()
  // biome-ignore lint/suspicious/noExplicitAny: <No proper type defination is available>
  public metadata?: Record<string, any>;

  public createdAt?: Date;
  public updatedAt?: Date;
}

function getToolModel() {
  return (mongoose.models.Tool as ReturnType<typeof getModelForClass<typeof Tool>>) ?? getModelForClass(Tool);
}

export const ToolModel = getToolModel();
