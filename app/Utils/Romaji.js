"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.romanizeLine = void 0;
const tinyld = __importStar(require("tinyld"));
const kuroshiro_1 = __importDefault(require("kuroshiro"));
const kuroshiro_analyzer_kuromoji_1 = __importDefault(require("kuroshiro-analyzer-kuromoji"));
const es_hangul_1 = require("es-hangul");
const TinyPinyin = require("tiny-pinyin");
const kuroshiro = new kuroshiro_1.default();
let isKuroshiroInitialized = false;
async function initKuroshiro() {
    if (!isKuroshiroInitialized) {
        await kuroshiro.init(new kuroshiro_analyzer_kuromoji_1.default());
        isKuroshiroInitialized = true;
    }
}
function detectLang(text) {
    const lang = tinyld.detect(text);
    return lang ? lang : "unknown";
}
async function romanizeLine(line) {
    const lang = detectLang(line);
    switch (lang) {
        case "ja": {
            await initKuroshiro();
            return await kuroshiro.convert(line, { to: "romaji", mode: "spaced" });
        }
        case "ko": {
            return (0, es_hangul_1.romanize)(line);
        }
        case "zh": {
            if (TinyPinyin.isSupported()) {
                return TinyPinyin.convertToPinyin(line, " ", true);
            }
            else {
                return line;
            }
        }
        default:
            return line;
    }
}
exports.romanizeLine = romanizeLine;
//# sourceMappingURL=Romaji.js.map