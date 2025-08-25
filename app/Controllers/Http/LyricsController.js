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
const Romaji_1 = global[Symbol.for('ioc.use')]("App/Utils/Romaji");
class LyricsController {
    async index({ request, response }) {
        let lyrics = request.body().lyrics;
        if (!lyrics && !this.isLrcFormat(lyrics)) {
            const errorResponse = new ErrorResponse_1.default(ServerConstants_1.default.E_BAD_REQUEST, MessageManager_1.default.fieldsRequired(), HttpConstants_1.default.BAD_REQUEST_CODE, MessageManager_1.default.fieldsRequiredDetails());
            throw new BadRequestException_1.default(errorResponse);
        }
        const lines = lyrics.split("\n").map(line => {
            const match = line.match(/^\[(.*?)\]\s*(.*)$/);
            return match ? { time: match[1], text: match[2] } : null;
        }).filter(Boolean);
        if (lines.length === 0) {
            const errorResponse = new ErrorResponse_1.default(ServerConstants_1.default.E_BAD_REQUEST, MessageManager_1.default.contentTypeNotAllowed(), HttpConstants_1.default.BAD_REQUEST_CODE, MessageManager_1.default.contentTypeNotAllowedDetails());
            throw new BadRequestException_1.default(errorResponse);
        }
        const allText = lines.map((l) => l.text).join("\n");
        const romanizedText = await (0, Romaji_1.romanizeLine)(allText);
        const romanizedLines = romanizedText.split("\n");
        const lrc = lines.map((line, i) => {
            const txt = romanizedLines[i]?.replace(/\s+/g, ' ').trim() || '';
            return `[${line.time}] ${txt}`;
        }).join("\n");
        return response.status(HttpConstants_1.default.SUCCESS_CODE).json({
            statusCode: StatusConstanst_1.default.SUCCESS_STATUS_CODE,
            message: MessageManager_1.default.success(),
            resultSet: {
                lyrics: lrc
            }
        });
    }
    isLrcFormat(content) {
        if (!content)
            return false;
        const lrcRegex = /\[\d{2}:\d{2}(?:\.\d{1,3})?\]/;
        return lrcRegex.test(content);
    }
}
exports.default = LyricsController;
//# sourceMappingURL=LyricsController.js.map