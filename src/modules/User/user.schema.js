import { query } from "express";
import Joi from "joi";

export const SignUpSchema = {
  body: Joi.object({
    firstName: Joi.string().min(3).max(10).alphanum().required(),
    lastName: Joi.string().min(3).max(10).alphanum().required(),
    email: Joi.string().required().email({
      minDomainSegments: 2,
      maxDomainSegments: 4,
      tlds: { allow: ["com", "net", "org"] },
    }),
    password: Joi.string()
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$!%*?&])[A-Za-z\d$!%*?&]{8,}$/
      )
      .required()
      .messages({
        "string.pattern.base":
          "Password must have at least one lowercase letter, one uppercase letter, one number and one special character",
        "any.required": "You need to provide a password",
        "string.min": "Password should have a minimum length of 3 characters",
      }),
    recoveryEmail: Joi.string().required().email({
      minDomainSegments: 2,
      maxDomainSegments: 4,
      tlds: { allow: ["com", "net", "org"] },
      }),
    DOB: Joi.date().required(),
    mobileNumber: Joi.number().required(),
    role: Joi.string().required().valid("User","Company_HR"),
    status: Joi.string().required().valid("offline", "online")
    })
    .options({ presence: "required" }),
};

export const SignInSchema = {
  body: Joi.object({
    email: Joi.string().required().email({
      minDomainSegments: 2,
      maxDomainSegments: 4,
      tlds: { allow: ["com", "net", "org"] },
    }),
    password: Joi.string().required(),
    })
    .options({ presence: "required" }),
};

export const updateSchema = {
  body: Joi.object({
    firstName: Joi.string().min(3).max(10).alphanum().required(),
    lastName: Joi.string().min(3).max(10).alphanum().required(),
    email: Joi.string().required().email({
      minDomainSegments: 2,
      maxDomainSegments: 4,
      tlds: { allow: ["com", "net", "org"] },
    }),
    recoveryEmail: Joi.string().required().email({
      minDomainSegments: 2,
      maxDomainSegments: 4,
      tlds: { allow: ["com", "net", "org"] },
      }),
    DOB: Joi.date().required(),
    mobileNumber: Joi.number().required()
    })
    .options({ presence: "required" }),
};

export const updatePassSchema = {
  body: Joi.object({
    password: Joi.string().required()
  })
}

export const getAnotherUserSchema = {
  params: Joi.object({
    _id: Joi.string().required().length(24).hex()
  })
}

export const getAllUserSchema = {
  query: Joi.object({
    recoveryEmail: Joi.string().required().email({
      minDomainSegments: 2,
      maxDomainSegments: 4,
      tlds: { allow: ["com", "net", "org"] },
      }),
  })
}