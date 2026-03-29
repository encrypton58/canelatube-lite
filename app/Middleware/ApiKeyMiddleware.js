"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
const ErrorResponse_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/ErrorResponse"));
const ServerConstants_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Constants/ServerConstants"));
const MessageManager_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Utils/MessageManager"));
const HttpConstants_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Constants/HttpConstants"));
const BadRequestException_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Exceptions/BadRequestException"));
class ApiKeyMiddleware {
    async handle({ request }, next) {
        const apiKey = request.header('x-api-key');
        if (apiKey !== Env_1.default.get('ANDROID_APP_KEY')) {
            const errorResponse = new ErrorResponse_1.default(ServerConstants_1.default.E_UNAUTHORIZED, MessageManager_1.default.unauthorized(), HttpConstants_1.default.UNAUTHORIZED_CODE, MessageManager_1.default.unauthorizedDetails());
            throw new BadRequestException_1.default(errorResponse);
        }
        await next();
    }
}
exports.default = ApiKeyMiddleware;
//# sourceMappingURL=ApiKeyMiddleware.js.map