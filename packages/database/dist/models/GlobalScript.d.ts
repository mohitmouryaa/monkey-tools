import "reflect-metadata";
export declare class GlobalScript {
    _id?: string;
    name: string;
    content: string;
    location: "HEAD" | "BODY";
    isActive: boolean;
}
export declare const GlobalScriptModel: import("@typegoose/typegoose").ReturnModelType<typeof GlobalScript, import("@typegoose/typegoose/lib/types.js").BeAnObject>;
//# sourceMappingURL=GlobalScript.d.ts.map