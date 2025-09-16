"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorDetailModel {
    constructor(code, field, message, reason = "") {
        this.code = code;
        this.field = field;
        this.message = message;
        this.reason = reason;
    }
}
exports.default = ErrorDetailModel;
//# sourceMappingURL=ErrorDetailModel.js.map