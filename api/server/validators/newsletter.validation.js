import Joi from "joi";

export const newsLetterAddSchema = Joi.object({
  email: Joi.string().required(),
});
