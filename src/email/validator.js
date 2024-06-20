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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const enum_1 = require("../utils/enum");
class SendEmailValidator {
    sendEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object({
                email: joi_1.default.string().email().required().messages({
                    "string.email": "Please enter a valid email address",
                    "any.required": "Email address is required",
                }),
                name: joi_1.default.string().required().messages({
                    "string.base": "Name must be text",
                    "any.required": "Name is required.",
                }),
                city: joi_1.default.string().required().messages({
                    "string.base": "City must be text",
                    "any.required": "City is required.",
                }),
                phoneNumber: joi_1.default.string()
                    .pattern(/^[0-9]{10,15}$/)
                    .required()
                    .messages({
                    "string.pattern.base": "Phone number must be between 10 and 15 digits",
                    "any.required": "Phone number is required",
                }),
            });
            const { error } = schema.validate(req.body);
            if (!error) {
                return next();
            }
            else {
                console.log(error);
                return res.status(400).json({
                    message: enum_1.MessageResponse.Error,
                    description: error.details[0].message,
                    data: null,
                });
            }
        });
    }
}
exports.sendEmailValidator = new SendEmailValidator();
