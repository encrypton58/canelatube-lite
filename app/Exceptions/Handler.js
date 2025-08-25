"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Logger"));
const HttpExceptionHandler_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/HttpExceptionHandler"));
const HttpConstants_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Constants/HttpConstants"));
const ServerConstants_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Constants/ServerConstants"));
class ExceptionHandler extends HttpExceptionHandler_1.default {
    constructor() {
        super(Logger_1.default);
    }
    async handle(error, ctx) {
        if (error.code == ServerConstants_1.default.E_BAD_REQUEST) {
            return ctx.response.status(HttpConstants_1.default.BAD_REQUEST_CODE).json(error.errorResponse);
        }
        return super.handle(error, ctx);
    }
}
exports.default = ExceptionHandler;
//# sourceMappingURL=Handler.js.map