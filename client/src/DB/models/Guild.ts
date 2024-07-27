import { APIRole } from "discord.js";
import { Schema, Types, models, model, Model } from "mongoose";

export interface IGuild {
  guildId: string;
  ownerId: string;
  name: string;
  channelName: string;
  plan: string;
  embeds: any;
  ticket_create_embed_fields: any;
  categoryId: string;
  staff_roles: string[];
}

type GuildModel = Model<IGuild>;

const GuildSchema = new Schema<IGuild, GuildModel>(
  {
    guildId: {
      type: String,
      required: true,
      unique: true,
    },
    ownerId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    plan: {
      enum: ["free", "paid"],
      type: String,
      default: "free",
    },
    categoryId: {
      type: String,
    },
    staff_roles: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const Guild: GuildModel =
  models.Guild || model<IGuild, GuildModel>("Guild", GuildSchema);
export default Guild;
