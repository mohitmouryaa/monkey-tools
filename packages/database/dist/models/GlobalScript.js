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
import { prop, getModelForClass, modelOptions, Severity } from "@typegoose/typegoose";
let GlobalScript = class GlobalScript {
    _id;
    name;
    content;
    location;
    isActive;
};
__decorate([
    prop({ required: true }),
    __metadata("design:type", String)
], GlobalScript.prototype, "name", void 0);
__decorate([
    prop({ required: true }),
    __metadata("design:type", String)
], GlobalScript.prototype, "content", void 0);
__decorate([
    prop({ required: true, enum: ["HEAD", "BODY"] }),
    __metadata("design:type", String)
], GlobalScript.prototype, "location", void 0);
__decorate([
    prop({ default: true }),
    __metadata("design:type", Boolean)
], GlobalScript.prototype, "isActive", void 0);
GlobalScript = __decorate([
    modelOptions({
        schemaOptions: {
            timestamps: true,
            collection: "global_scripts",
        },
        options: {
            allowMixed: Severity.ALLOW,
            customName: "GlobalScript",
        },
    })
], GlobalScript);
export { GlobalScript };
function getGlobalScriptModel() {
    return (mongoose.models.GlobalScript ?? getModelForClass(GlobalScript));
}
export const GlobalScriptModel = getGlobalScriptModel();
