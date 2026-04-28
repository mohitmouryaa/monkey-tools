var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import "reflect-metadata";
import mongoose from "mongoose";
import { Category } from "./Category.js";
import { Post } from "./Post.js";
import { prop, getModelForClass, modelOptions, Severity } from "@typegoose/typegoose";
let Tool = class Tool {
    _id;
    title;
    link;
    componentName;
    description;
    category;
    // Visual properties
    icon;
    iconColor;
    bgColor;
    // SEO properties
    seoTitle;
    seoDescription;
    seoKeywords;
    // Page Content
    h1Heading;
    introText;
    stepsTitle;
    visualSteps;
    richContent;
    faqs;
    closingText;
    isActive;
    featuredPostId;
    metadata;
    createdAt;
    updatedAt;
};
__decorate([
    prop({ required: true, minlength: 2 }),
    __metadata("design:type", String)
], Tool.prototype, "title", void 0);
__decorate([
    prop({ required: true }),
    __metadata("design:type", String)
], Tool.prototype, "link", void 0);
__decorate([
    prop({ required: true, minlength: 2 }),
    __metadata("design:type", String)
], Tool.prototype, "componentName", void 0);
__decorate([
    prop({ required: true }),
    __metadata("design:type", String)
], Tool.prototype, "description", void 0);
__decorate([
    prop({ ref: () => Category, required: true }),
    __metadata("design:type", Object)
], Tool.prototype, "category", void 0);
__decorate([
    prop({ required: true }),
    __metadata("design:type", String)
], Tool.prototype, "icon", void 0);
__decorate([
    prop({ required: true }),
    __metadata("design:type", String)
], Tool.prototype, "iconColor", void 0);
__decorate([
    prop({ required: true }),
    __metadata("design:type", String)
], Tool.prototype, "bgColor", void 0);
__decorate([
    prop({ required: true }),
    __metadata("design:type", String)
], Tool.prototype, "seoTitle", void 0);
__decorate([
    prop({ required: true }),
    __metadata("design:type", String)
], Tool.prototype, "seoDescription", void 0);
__decorate([
    prop({ required: true }),
    __metadata("design:type", String)
], Tool.prototype, "seoKeywords", void 0);
__decorate([
    prop({ default: "" }),
    __metadata("design:type", String)
], Tool.prototype, "h1Heading", void 0);
__decorate([
    prop({ default: "" }),
    __metadata("design:type", String)
], Tool.prototype, "introText", void 0);
__decorate([
    prop({ default: "" }),
    __metadata("design:type", String)
], Tool.prototype, "stepsTitle", void 0);
__decorate([
    prop({ type: () => [Object], default: [] }),
    __metadata("design:type", Array)
], Tool.prototype, "visualSteps", void 0);
__decorate([
    prop({ default: "" }),
    __metadata("design:type", String)
], Tool.prototype, "richContent", void 0);
__decorate([
    prop({ type: () => [Object], default: [] }),
    __metadata("design:type", Array)
], Tool.prototype, "faqs", void 0);
__decorate([
    prop({ default: "" }),
    __metadata("design:type", String)
], Tool.prototype, "closingText", void 0);
__decorate([
    prop({ default: true }),
    __metadata("design:type", Boolean)
], Tool.prototype, "isActive", void 0);
__decorate([
    prop({ ref: () => Post, type: () => mongoose.Schema.Types.ObjectId, default: null }),
    __metadata("design:type", Object)
], Tool.prototype, "featuredPostId", void 0);
__decorate([
    prop()
    // biome-ignore lint/suspicious/noExplicitAny: <No proper type defination is available>
    ,
    __metadata("design:type", Object)
], Tool.prototype, "metadata", void 0);
Tool = __decorate([
    modelOptions({
        schemaOptions: {
            timestamps: true,
            collection: "tools",
        },
        options: {
            allowMixed: Severity.ALLOW,
            customName: "Tool",
        },
    })
], Tool);
export { Tool };
function getToolModel() {
    return mongoose.models.Tool ?? getModelForClass(Tool);
}
export const ToolModel = getToolModel();
