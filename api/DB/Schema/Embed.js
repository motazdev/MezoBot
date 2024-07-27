import mongoose, { Schema, Types, model } from "mongoose";

const EmbedSchema = new Schema(
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
      default: "Powered By Mezo Bot",
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
            $max: "$fields.order",
          },
        },
      },
    ]);

    if (lastRecord?.length) {
      if (this._update.$push?.fields) {
        // this._update.$push.fields.$each.order = lastRecord[0].fields + 1;
        this._update.$push.fields.$each.forEach((f, i) => {
          f.order = lastRecord[0].fields + 1 + i;
        });
      }
    }
  } catch (err) {
    console.log("Error Updating Id: ", err);
  }
});

const Embed = mongoose.models.Embed || model("Embed", EmbedSchema);

export default Embed;
