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
import { PageType } from "@workspace/types";
import { getModelForClass, prop, modelOptions, Severity } from "@typegoose/typegoose";
let Page = class Page {
    _id;
    pageType;
    slug;
    isActive;
    // Common SEO fields (all pages)
    seoTitle;
    seoDescription;
    seoKeywords;
    // Homepage specific (pageType === HOMEPAGE)
    heroSection;
    howItWorksSection;
    // All Tools page specific (pageType === ALL_TOOLS)
    h1Heading;
    shortDescription;
    // Custom pages specific (pageType === CUSTOM)
    title;
    // `content` é um Mongoose Mixed. Use SEMPRE atribuição direta
    // (page.content = newValue) — nunca mutate in-place sem markModified('content').
    // biome-ignore lint/suspicious/noExplicitAny: <Editor.js OutputData shape is dynamic; string for legacy HTML>
    content;
    showInFooter;
    footerOrder;
    footerLabel;
    createdAt;
    updatedAt;
};
__decorate([
    prop({ required: true, enum: PageType, index: true }),
    __metadata("design:type", String)
], Page.prototype, "pageType", void 0);
__decorate([
    prop({ required: true, index: true }),
    __metadata("design:type", String)
], Page.prototype, "slug", void 0);
__decorate([
    prop({ default: true }),
    __metadata("design:type", Boolean)
], Page.prototype, "isActive", void 0);
__decorate([
    prop({ required: true }),
    __metadata("design:type", String)
], Page.prototype, "seoTitle", void 0);
__decorate([
    prop({ required: true }),
    __metadata("design:type", String)
], Page.prototype, "seoDescription", void 0);
__decorate([
    prop({ default: "" }),
    __metadata("design:type", String)
], Page.prototype, "seoKeywords", void 0);
__decorate([
    prop({ type: () => Object }),
    __metadata("design:type", Object)
], Page.prototype, "heroSection", void 0);
__decorate([
    prop({ type: () => Object }),
    __metadata("design:type", Object)
], Page.prototype, "howItWorksSection", void 0);
__decorate([
    prop(),
    __metadata("design:type", String)
], Page.prototype, "h1Heading", void 0);
__decorate([
    prop(),
    __metadata("design:type", String)
], Page.prototype, "shortDescription", void 0);
__decorate([
    prop(),
    __metadata("design:type", String)
], Page.prototype, "title", void 0);
__decorate([
    prop({ type: () => Object })
    // biome-ignore lint/suspicious/noExplicitAny: <Editor.js OutputData shape is dynamic; string for legacy HTML>
    ,
    __metadata("design:type", Object)
], Page.prototype, "content", void 0);
__decorate([
    prop({ default: true }),
    __metadata("design:type", Boolean)
], Page.prototype, "showInFooter", void 0);
__decorate([
    prop({ default: 0 }),
    __metadata("design:type", Number)
], Page.prototype, "footerOrder", void 0);
__decorate([
    prop(),
    __metadata("design:type", String)
], Page.prototype, "footerLabel", void 0);
Page = __decorate([
    modelOptions({
        schemaOptions: {
            timestamps: true,
            collection: "pages",
        },
        options: {
            allowMixed: Severity.ALLOW,
            customName: "Page",
        },
    })
], Page);
export { Page };
function getPageModel() {
    const model = mongoose.models.Page ?? getModelForClass(Page);
    return model;
}
export const PageModel = getPageModel();
// Create compound index for pageType + slug uniqueness - handle this in schema definition instead
// The index should be defined in the @modelOptions or through a migration
