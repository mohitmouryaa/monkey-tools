import "reflect-metadata";
import { Category } from "./Category.js";
import type { Post } from "./Post.js";
import { type Ref } from "@typegoose/typegoose";
export declare class Tool {
    _id?: string;
    title: string;
    link: string;
    componentName: string;
    description: string;
    category: Ref<Category>;
    icon: string;
    iconColor: string;
    bgColor: string;
    seoTitle: string;
    seoDescription: string;
    seoKeywords: string;
    h1Heading?: string;
    introText?: string;
    stepsTitle?: string;
    visualSteps?: Array<{
        icon: string;
        title: string;
        description: string;
        iconColor?: string;
        bgColor?: string;
    }>;
    richContent?: string;
    faqs?: Array<{
        question: string;
        answer: string;
    }>;
    closingText?: string;
    isActive: boolean;
    featuredPostId?: Ref<Post> | null;
    metadata?: Record<string, any>;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare const ToolModel: import("@typegoose/typegoose").ReturnModelType<typeof Tool, import("@typegoose/typegoose/lib/types.js").BeAnObject>;
//# sourceMappingURL=Tool.d.ts.map