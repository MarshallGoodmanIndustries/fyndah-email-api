import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { Request } from "express";

import { ISendEmail } from "./interface";

dotenv.config();

export const sendEmail = async (input: ISendEmail) => {
  const { receiverEmail, subject, emailTemplate } = input;

  const transporter = nodemailer.createTransport({
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

  await TransportMailService(transporter, mailOptions);
};

const TransportMailService = async (transporter: any, mailOptions: any) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (error: any, info: any) {
      if (error) {
        reject(false);
      } else {
        resolve(info.response);
      }
    });
  });
};

export const sendContactEmail = async (receiverEmail: string, req: Request) => {
  const { email, name, city, phoneNumber } = req.body;

  return sendEmail({
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
};
