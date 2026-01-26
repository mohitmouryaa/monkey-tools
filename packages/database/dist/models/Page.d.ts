import "reflect-metadata";
import { PageType } from "@workspace/types";
export declare class Page {
    _id?: string;
    pageType: PageType;
    slug: string;
    isActive: boolean;
    seoTitle: string;
    seoDescription: string;
    seoKeywords: string;
    heroSection?: {
        badge: string;
        heading: string;
        description: string;
        primaryButtonText: string;
        primaryButtonLink: string;
        secondaryButtonText: string;
        secondaryButtonLink: string;
    };
    howItWorksSection?: {
        title: string;
        subtitle: string;
        steps: Array<{
            iconName: string;
            title: string;
            description: string;
            order: number;
        }>;
    };
    h1Heading?: string;
    shortDescription?: string;
    title?: string;
    content?: string;
    showInFooter?: boolean;
    footerOrder?: number;
    footerLabel?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare const PageModel: import("@typegoose/typegoose").ReturnModelType<typeof Page, import("@typegoose/typegoose/lib/types.js").BeAnObject>;
//# sourceMappingURL=Page.d.ts.map