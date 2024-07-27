import { z } from "zod";
export const EmbedFieldsValidator = z.object({
  name: z.string().min(1).max(256),
  value: z.string().min(1).max(1024),
  inline: z.boolean(),
  order: z.number().optional(),
});

export const EmbedEditorValidator = z.object({
  title: z.string().min(1).max(256),
  description: z.string().min(1).max(4096),
  footer: z.string().min(1).max(2048),
  fields: z.array(EmbedFieldsValidator),
});

export type TEmbedEditorValidator = z.infer<typeof EmbedEditorValidator>;
