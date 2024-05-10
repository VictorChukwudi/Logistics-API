import Joi from "joi";

export const registerSchema = Joi.object({
    firstname: Joi.string()
        .required(),
    lastname: Joi.string()
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } })
        .required(),
    password: Joi.string()
        .required()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    repeat_password: Joi.ref('password'),
})
.with("firstname", "lastname")    
.with("password", "repeat_password");


export const loginSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } })
        .required(),
    password: Joi.string()
        .required()
})
.with("email", "password")
