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
exports.sendContactEmail = exports.sendEmail = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const nodemailer_1 = __importDefault(require("nodemailer"));
dotenv_1.default.config();
const sendEmail = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const { receiverEmail, subject, emailTemplate } = input;
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        // host: "mail.privateemail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAILSENDER,
            pass: process.env.EMAILSENDERPASSWORD,
        },
    });
    const mailOptions = {
        from: `AXEONE <${process.env.EMAILSENDER}>`,
        to: receiverEmail,
        subject,
        html: emailTemplate,
    };
    yield TransportMailService(transporter, mailOptions);
});
exports.sendEmail = sendEmail;
const TransportMailService = (transporter, mailOptions) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                reject(false);
            }
            else {
                resolve(info.response);
            }
        });
    });
});
const sendContactEmail = (receiverEmail, req) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, city, phoneNumber } = req.body;
    return (0, exports.sendEmail)({
        receiverEmail: receiverEmail,
        subject: "AXEONE USER DETAILS",
        emailTemplate: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Information</title>
    <style>
        * {
            box-sizing: border-box;
        }
        html, body {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            overflow-x: hidden; /* Prevents horizontal overflow */
        }
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            overflow: hidden; /* Prevents content overflow */
        }
        .header {
            text-align: center;
            background-color: #007bff;
            color: #ffffff;
            padding: 10px 0;
            border-radius: 10px 10px 0 0;
        }
        .header h1 {
            margin: 0;
        }
        .content {
            padding: 20px;
        }
        .content h2 {
            color: #333333;
        }
        .content p {
            line-height: 1.6;
            color: #666666;
        }
        .footer {
            text-align: center;
            padding: 10px 0;
            color: #999999;
            font-size: 12px;
        }
        .footer a {
            color: #007bff;
            text-decoration: none;
        }
        .footer a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>User Information</h1>
        </div>
        <div class="content">
            <h2>Details of the user:</h2>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>City:</strong> ${city}</p>
            <p><strong>Phone Number:</strong> ${phoneNumber}</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 AXEONE. All rights reserved.</p>
        </div>
    </div>
</body>
</html>

`,
    });
});
exports.sendContactEmail = sendContactEmail;
