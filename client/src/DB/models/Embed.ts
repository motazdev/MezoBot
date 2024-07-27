import { Schema, models, model, Model } from "mongoose";

export interface IEmbed {
  id: number;
  guildId: string;
  title: string;
  description: string;
  footer: string;
  embed_tag: string;
  fields: EmbedFields[];
}
type EmbedFields = {
  _id: string;
  name: string;
  value: string;
  inline: boolean;
  order: number;
};
type EmbedModel = Model<IEmbed>;
const EmbedSchema = new Schema<IEmbed, EmbedModel>(
  {
    id: {
      type: Number,
      required: true,
      default: 0,
    },
    guildId: {
      type: String,
      required: true,
      ref: "Guild",
    },
    title: {
      type: String,
      max: 256,
      default: "",
    },
    description: {
      type: String,
      max: 4096,
      default: "",
    },
    footer: {
      type: String,
      max: 2048,
    },
    fields: [
      {
        name: {
          type: String,
          required: true,
        },
        value: {
          type: String,
          required: true,
        },
        inline: {
          type: Boolean,
          required: true,
        },
        order: {
          type: Number,
          default: 0,
        },
      },
    ],

    embed_tag: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

EmbedSchema.pre("save", async function (next) {
  try {
    const lastRecord = await Embed.findOne().sort("-id");
    lastRecord &&
      this.set({
        id: ++lastRecord.id,
      });
  } catch (err) {
    console.log("Error Updating Id: ", err);
  }
  next();
});

EmbedSchema.pre("findOneAndUpdate", async function () {
  try {
    const lastRecord = await this.model.aggregate([
      {
        $match: this.getQuery(),
      },
      {
        $unwind: "$fields",
      },
      {
        $sort: {
          "fields.order": -1,
        },
      },
      {
        $group: {
          _id: "$_id",

          fields: {
            $max: "$fields",
          },
        },
      },
    ]);
    if (lastRecord?.length) {
      const doc = this as any;
      doc._update.$push.fields.order = lastRecord[0].fields.order + 1;
    }
  } catch (err) {
    console.log("Error Updating Id: ", err);
  }
});

const Embed: EmbedModel =
  models.Embed || model<IEmbed, EmbedModel>("Embed", EmbedSchema);
export default Embed;
