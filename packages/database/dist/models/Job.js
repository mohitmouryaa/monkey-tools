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
import { Status } from "@workspace/types";
import { prop, getModelForClass, modelOptions, Severity } from "@typegoose/typegoose";
let Job = class Job {
    tool;
    status;
    inputFile;
    outputFile;
    metadata;
    error;
    completedAt;
};
__decorate([
    prop({ required: true }),
    __metadata("design:type", String)
], Job.prototype, "tool", void 0);
__decorate([
    prop({ enum: Status, default: Status.IN_PROGRESS }),
    __metadata("design:type", String)
], Job.prototype, "status", void 0);
__decorate([
    prop({ required: true }),
    __metadata("design:type", String)
], Job.prototype, "inputFile", void 0);
__decorate([
    prop(),
    __metadata("design:type", String)
], Job.prototype, "outputFile", void 0);
__decorate([
    prop(),
    __metadata("design:type", Object)
], Job.prototype, "metadata", void 0);
__decorate([
    prop(),
    __metadata("design:type", String)
], Job.prototype, "error", void 0);
__decorate([
    prop({ default: Date.now }),
    __metadata("design:type", Date)
], Job.prototype, "completedAt", void 0);
Job = __decorate([
    modelOptions({
        schemaOptions: {
            timestamps: true,
            collection: "jobs",
        },
        options: {
            allowMixed: Severity.ALLOW,
            customName: "Job",
        },
    })
], Job);
export { Job };
function getJobModel() {
    return mongoose.models.Job ?? getModelForClass(Job);
}
export const JobModel = getJobModel();
