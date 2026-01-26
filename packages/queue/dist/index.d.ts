import { Queue, Worker } from "bullmq";
import { connection } from "./connection.js";
export { connection };
export * from "./rate-limit.js";
export declare const QUEUE_NAME = "job-queue";
export declare const myQueue: Queue<any, any, string, any, any, string>;
export declare const createWorker: (processor: string | ((job: any) => Promise<any>)) => Worker<any, any, string>;
//# sourceMappingURL=index.d.ts.map