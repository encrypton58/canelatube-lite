"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorResponse {
    constructor(type, title, status, detail) {
        this.type = type;
        this.title = title;
        this.status = status;
        this.detail = detail;
    }
    setMore(more) {
        this.more = more;
    }
}
exports.default = ErrorResponse;
//# sourceMappingURL=ErrorResponse.js.map