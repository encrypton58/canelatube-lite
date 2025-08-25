"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const standalone_1 = require("@adonisjs/core/build/standalone");
const HttpConstants_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Constants/HttpConstants"));
class BadRequestException extends standalone_1.Exception {
    constructor(errorResponse) {
        super(errorResponse.title, HttpConstants_1.default.BAD_REQUEST_CODE, errorResponse.type);
        this.errorResponse = errorResponse;
    }
}
exports.default = BadRequestException;
//# sourceMappingURL=BadRequestException.js.map