"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpConstants_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Constants/HttpConstants"));
const ServerConstants_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Constants/ServerConstants"));
const StatusConstanst_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Constants/StatusConstanst"));
const BadRequestException_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Exceptions/BadRequestException"));
const ErrorResponse_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/ErrorResponse"));
const MessageManager_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Utils/MessageManager"));
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
const Romaji_1 = global[Symbol.for('ioc.use')]("App/Utils/Romaji");
class LyricsController {
    async index({ request, response }) {
        const payload = await request.validate({
            schema: Validator_1.schema.create({
                isSync: Validator_1.schema.boolean(),
                lyrics: Validator_1.schema.string({ trim: true, escape: true }),
            }),
            messages: {
                required: MessageManager_1.default.required('{{field}}')
            }
        });
        const { isSync, lyrics } = payload;
        if (isSync) {
            if (!this.isLrcFormat(lyrics)) {
                return this.badRequest();
            }
            const lines = this.parseLrcLines(lyrics);
            if (!lines.length) {
                return this.badRequest();
            }
            const romanized = await (0, Romaji_1.romanizeLine)(lines.map(l => l.text).join('\n'));
            const romanizedLines = romanized.split('\n');
            const lrc = lines.map((line, i) => `[${line.time}] ${romanizedLines[i]?.replace(/\s+/g, ' ').trim() || ''}`).join('\n');
            return response.status(HttpConstants_1.default.SUCCESS_CODE).json({
                statusCode: StatusConstanst_1.default.SUCCESS_STATUS_CODE,
                message: MessageManager_1.default.success(),
                resultSet: { lyrics: lrc },
            });
        }
        const romanizedText = await (0, Romaji_1.romanizeLine)(lyrics);
        return response.status(HttpConstants_1.default.SUCCESS_CODE).json({
            statusCode: StatusConstanst_1.default.SUCCESS_STATUS_CODE,
            message: MessageManager_1.default.success(),
            resultSet: { lyrics: romanizedText },
        });
    }
    isLrcFormat(content) {
        return !!content && /\[\d{2}:\d{2}(?:\.\d{1,3})?\]/.test(content);
    }
    parseLrcLines(lyrics) {
        return lyrics.split('\n').reduce((acc, line) => {
            const match = line.match(/^\[(.*?)\]\s*(.*)$/);
            if (match)
                acc.push({ time: match[1], text: match[2] });
            return acc;
        }, []);
    }
    badRequest() {
        const errorResponse = new ErrorResponse_1.default(ServerConstants_1.default.E_BAD_REQUEST, MessageManager_1.default.contentTypeNotAllowed(), HttpConstants_1.default.BAD_REQUEST_CODE, MessageManager_1.default.contentTypeNotAllowedDetails());
        throw new BadRequestException_1.default(errorResponse);
    }
}
exports.default = LyricsController;
//# sourceMappingURL=LyricsController.js.map