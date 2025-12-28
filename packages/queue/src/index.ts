import { Queue } from "bullmq";
import { connection } from "./connection";

export const QUEUE_NAME = "job-queue";

export const myQueue = new Queue(QUEUE_NAME, {
  connection,
  defaultJobOptions: {
    attempts: 3, // Retry failed jobs 3 times
    backoff: {
      type: "exponential",
      delay: 1000,
    },
    removeOnComplete: true, // Auto-delete to save Redis memory
  },
});
