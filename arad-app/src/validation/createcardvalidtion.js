import Joi from "joi";
import validation from "./validation";

const cardSchema = Joi.object({
  title: Joi.string().min(2).max(256).required(),
  subtitle: Joi.string().min(2).max(256).allow(""),
  description: Joi.string().min(2).max(1024).allow(""),
  phone: Joi.string()
    .min(9)
    .max(11)
    .pattern(/^\+?(972|0)(\-)?0?(([23489]{1}\d{7})|[5]{1}\d{8})$/)
    .allow(""),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .min(5)
    .allow(""),
  web: Joi.string().min(14).allow(""),
  image: Joi.object({
    url: Joi.string().min(14).allow(""),
    alt: Joi.string().min(2).max(256).allow(""),
  }),
  address: Joi.object({
    state: Joi.string().min(2).max(256).allow(""),
    country: Joi.string().min(2).max(256).required(),
    city: Joi.string().min(2).max(256).required(),
    street: Joi.string().min(2).max(256).required(),
    houseNumber: Joi.number().min(2).max(256).required(),
    zip: Joi.number().min(2).max(256).allow(""),
  }),
});

const validateCard = (inputToCheck) => validation(cardSchema, inputToCheck);

export { validateCard };
