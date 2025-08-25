"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MessageManager_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Utils/MessageManager"));
class Language {
    async handle({ request }, next) {
        const preferedLanguage = request.header('Accept-Language')?.split(',')[0] || 'en';
        request.body().language = preferedLanguage;
        MessageManager_1.default.language = preferedLanguage;
        await next();
    }
}
exports.default = Language;
//# sourceMappingURL=Language.js.map