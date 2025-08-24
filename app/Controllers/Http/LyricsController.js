"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Romaji_1 = global[Symbol.for('ioc.use')]("App/Utils/Romaji");
class LyricsController {
    async index({ request, response }) {
        let lyrics = request.body().lyrics;
        if (!lyrics && !this.isLrcFormat(lyrics)) {
            return response.status(400).json({ error: 'Invalid or missing lyrics in LRC format' });
        }
        const lines = lyrics.split("\n").map(line => {
            const match = line.match(/^\[(.*?)\]\s*(.*)$/);
            return match ? { time: match[1], text: match[2] } : null;
        }).filter(Boolean);
        if (lines.length === 0) {
            return response.status(400).json({ error: 'Invalid or missing lyrics in LRC format' });
        }
        const allText = lines.map((l) => l.text).join("\n");
        const romanizedText = await (0, Romaji_1.romanizeLine)(allText);
        const romanizedLines = romanizedText.split("\n");
        const lrc = lines.map((line, i) => {
            const txt = romanizedLines[i]?.replace(/\s+/g, ' ').trim() || '';
            return `[${line.time}] ${txt}`;
        }).join("\n");
        return response.status(200).json({
            statusCode: 0,
            message: 'Success',
            resultSet: {
                lyrics: JSON.stringify(lrc)
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