import "reflect-metadata";
import { Status } from "@workspace/types";
export declare class Job {
    tool: string;
    status: Status;
    inputFile: string;
    outputFile?: string;
    metadata?: Record<string, string>;
    error?: string;
    completedAt?: Date;
}
export declare const JobModel: import("@typegoose/typegoose").ReturnModelType<typeof Job, import("@typegoose/typegoose/lib/types.js").BeAnObject>;
//# sourceMappingURL=Job.d.ts.map