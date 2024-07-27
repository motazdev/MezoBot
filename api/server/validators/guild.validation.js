import Joi from "joi";

export const embedCreateSchema = Joi.object({
  title: Joi.string().max(256),
  description: Joi.string().max(4096),
  footer: Joi.string().max(2048),
  inline: Joi.boolean(),
  guildId: Joi.string().required(),
  embedTag: Joi.string().required(),
});

const embedFieldsSchema = Joi.object({
  _id: Joi.string().max(256),
  name: Joi.string().max(256),
  value: Joi.string().max(256),
  order: Joi.number(),
  inline: Joi.boolean().optional().default(false),
});

export const embedUpdateSchema = Joi.object({
  title: Joi.string().max(256).optional(),
  description: Joi.string().max(4096).optional(),
  footer: Joi.string().max(2048).optional(),
  fields: Joi.array().items(embedFieldsSchema).optional(),
  guildId: Joi.string().required(),
  embedTag: Joi.string().required(),
});

export const FieldDeleteSchema = Joi.object({
  fieldId: Joi.string().required(),
  guildId: Joi.string().required(),
  embedTag: Joi.string().required(),
});
