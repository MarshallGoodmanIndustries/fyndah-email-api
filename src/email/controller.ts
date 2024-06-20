import { Request, Response } from "express";

import { MessageResponse } from "../utils/enum";
import { sendContactEmail } from "../utils/email";

class EmailController {
    public async sendEmail(req: Request, res: Response) {
        const receiverEmail = "victorkudos@gmail.com";
        
        await sendContactEmail(receiverEmail, req);

        return res.status(200).json({
            message: MessageResponse.Success,
            description: "Email Sent! 📧",
            data: null,
        });
    }
}

export const emailController = new EmailController();
