"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    language: 'en',
    fieldsRequired() {
        switch (this.language) {
            case 'es':
                return `Campos requeridos 😭`;
            case 'en':
                return `Fields required 😭`;
            default:
                return `Fields required 😭`;
        }
    },
    fieldsRequiredDetails() {
        switch (this.language) {
            case 'es':
                return `El formulario está un poco vacío 📄❌. Necesitamos algunos datos para seguir adelante 🏃‍♂️‍➡️`;
            case 'en':
                return `Required fields have not been filled 😭`;
            default:
                return `Required fields have not been filled 😭`;
        }
    },
    contentTypeNotAllowed() {
        switch (this.language) {
            case 'es':
                return `Tipo de contenido no permitido 🚫`;
            case 'en':
                return `Content type not allowed 🚫`;
            default:
                return `Content type not allowed 🚫`;
        }
    },
    required(field) {
        switch (this.language) {
            case 'es':
                return `El campo ${field} no es correcto 😭`;
            case 'en':
                return `Field ${field} not correct 😭`;
            default:
                return `Field ${field} not correct 😭`;
        }
    },
    fieldsRequiredMoreDetails() {
        switch (this.language) {
            case 'es':
                return `Necesitamos más información sobre los campos requeridos 📄❌`;
            case 'en':
                return `We need more information about the required fields 📄❌`;
            default:
                return `We need more information about the required fields 📄❌`;
        }
    },
    contentTypeNotAllowedDetails() {
        switch (this.language) {
            case 'es':
                return `El tipo de contenido que has enviado no es compatible 📄❌`;
            case 'en':
                return `The content type you have sent is not allowed 📄❌`;
            default:
                return `The content type you have sent is not allowed 📄❌`;
        }
    },
    success() {
        switch (this.language) {
            case 'es':
                return `Se obtuvo la información correctamente 😎`;
            case 'en':
                return `The information was obtained correctly 😎`;
            default:
                return `The information was obtained correctly 😎`;
        }
    }
};
//# sourceMappingURL=MessageManager.js.map