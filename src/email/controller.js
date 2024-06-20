"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailController = void 0;
const enum_1 = require("../utils/enum");
const email_1 = require("../utils/email");
class EmailController {
    sendEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const receiverEmail = "victorkudos@gmail.com";
            yield (0, email_1.sendContactEmail)(receiverEmail, req);
            return res.status(200).json({
                message: enum_1.MessageResponse.Success,
                description: "Email Sent! 📧",
                data: null,
            });
        });
    }
}
exports.emailController = new EmailController();
