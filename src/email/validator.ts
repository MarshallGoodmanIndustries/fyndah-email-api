import Joi from "joi";
import { Request, Response, NextFunction } from "express";

import { MessageResponse } from "../utils/enum";

class SendEmailValidator {
  public async sendEmail(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const schema = Joi.object({
      email: Joi.string().email().required().messages({
        "string.email": "Please enter a valid email address",
        "any.required": "Email address is required",
      }),
      name: Joi.string().required().messages({
        "string.base": "Name must be text",
        "any.required": "Name is required.",
      }),
      city: Joi.string().required().messages({
        "string.base": "City must be text",
        "any.required": "City is required.",
      }),
      phoneNumber: Joi.string()
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
    } else {
      console.log(error);
      return res.status(400).json({
        message: MessageResponse.Error,
        description: error.details[0].message,
        data: null,
      });
    }
  }
}

export const sendEmailValidator = new SendEmailValidator();
