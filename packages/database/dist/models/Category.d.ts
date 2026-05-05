import "reflect-metadata";
export declare class Category {
    _id?: string;
    name: string;
    slug: string;
    description: string;
    icon: string;
    isActive: boolean;
    color: string;
}
export declare const CategoryModel: import("@typegoose/typegoose").ReturnModelType<typeof Category, import("@typegoose/typegoose/lib/types.js").BeAnObject>;
//# sourceMappingURL=Category.d.ts.map