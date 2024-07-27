import { QueryTimestampsConfig } from "mongoose";
import { UseFieldArrayReturn } from "react-hook-form";

export interface IEmbedFieldResponse {
  _id: string;
  name: string;
  value: string;
  inline: boolean;
  order: number;
}
export interface IEmbedResponse extends QueryTimestampsConfig {
  _id: string;
  id: number;
  guildId: string;
  title: string;
  footer: string;
  description: string;
  fields: IEmbedFieldResponse[];
  embed_tag: string;
}

export interface IEmbedField {
  name: string;
  value: string;
  inline: boolean;
}

export interface IEmbed {
  title: string;
  footer: string;
  description: string;
  fields: IEmbedField[];
}
