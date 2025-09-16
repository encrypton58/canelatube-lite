"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Logger"));
const HttpExceptionHandler_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/HttpExceptionHandler"));
const HttpConstants_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Constants/HttpConstants"));
const ServerConstants_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Constants/ServerConstants"));
const ErrorResponse_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/ErrorResponse"));
const MessageManager_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Utils/MessageManager"));
class ExceptionHandler extends HttpExceptionHandler_1.default {
    constructor() {
        super(Logger_1.default);
    }
    async handle(error, ctx) {
        if (error.code == ServerConstants_1.default.E_BAD_REQUEST) {
            return ctx.response.status(HttpConstants_1.default.BAD_REQUEST_CODE).json(error.errorResponse);
        }
        if (ctx.response.getStatus() == HttpConstants_1.default.UNPROCESSABLE_ENTITY_CODE_HTTP) {
            const errorResponse = new ErrorResponse_1.default(ServerConstants_1.default.E_FIELDS_REQUIRED_CODE, MessageManager_1.default.fieldsRequired(), ctx.response.getStatus(), MessageManager_1.default.fieldsRequiredDetails());
            return ctx.response.status(HttpConstants_1.default.UNPROCESSABLE_ENTITY_CODE_HTTP).json(errorResponse);
        }
        return super.handle(error, ctx);
    }
}
exports.default = ExceptionHandler;
//# sourceMappingURL=Handler.js.map