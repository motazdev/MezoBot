import Embed from "../../../DB/Schema/Embed.js";
import { isGuildExist } from "../../helpers/isGuildExist.js";

export const createEmbed = async (req, res, next) => {
  try {
    const { embedTag, guildId } = req.params;
    const { title, value, inline, footer } = req.body;
    const embed = await Embed.findOne({ embed_tag: embedTag });
    if (isGuildExist(guildId)) {
      if (embed) {
        const updatedEmbed = await Embed.findOneAndUpdate(
          {
            guildId,
            embed_tag: embedTag,
          },
          {
            title,
            value,
            inline: inline || false,
            footer,
          }
        );
        return res.json({
          success: true,
          data: "Embed Updated Successfully",
        });
      } else {
        const newEmbed = await Embed.create({
          guildId,
          title,
          value,
          inline: inline || false,
          embed_tag: embedTag,
          footer,
        });
        return res.json({
          success: true,
          data: "Embed Created Successfully",
        });
      }
    }

    return res.json({
      success: false,
      data: "Embed or guild doesn't exist",
    });
  } catch (error) {
    console.log("error: ", error);
  }
};

export const addEmbedField = async (req, res, next) => {
  try {
    const { embedTag, guildId } = req.params;
    const { name, value, inline, fields } = req.body;

    if (isGuildExist(guildId)) {
      const embed = await Embed.findOneAndUpdate(
        {
          embed_tag: embedTag,
          guildId,
        },
        {
          $push: {
            fields: {
              name,
              value,
              inline: inline || false,
            },
          },
        }
      );
      if (!embed) {
        const newEmbed = await Embed.create({
          guildId,
          embed_tag: embedTag,
          fields: fields || [],
        });
        return res.json({
          success: true,
          data: "Embed Created Successfully",
        });
      }
      return res.json({
        success: true,
        data: "Embed Updated Successfully",
      });
    }

    return res.json({
      success: false,
      data: "Embed or guild doesn't exist",
    });
  } catch (error) {
    console.log("error: ", error);
  }
};
export const updateEmbed = async (req, res, next) => {
  try {
    const { embedTag, guildId } = req.params;
    const { title, description, fields, footer } = req.body;
    if (isGuildExist(guildId)) {
      const embed = await Embed.findOneAndUpdate(
        {
          embed_tag: embedTag,
          guildId,
        },
        {
          title,
          description,
          footer,
          fields,
        }
      );

      if (!embed) {
        const newEmbed = await Embed.create({
          guildId,
          title,
          description,
          embed_tag: embedTag,
          fields: fields || [],
        });
        return res.json({
          success: true,
          data: "Embed Created Successfully",
        });
      }
      return res.json({
        success: true,
        data: "Embed Updated Successfully",
      });
    }

    return res.json({
      success: false,
      data: "Embed or guild doesn't exist",
    });
  } catch (error) {
    console.log("error: ", error);
  }
};
export const getGuildEmbed = async (req, res, next) => {
  const { guildId, embedTag } = req.params;
  if (isGuildExist(guildId) && embedTag) {
    const data = await Embed.find({ guildId, embed_tag: embedTag });
    return res.json({
      success: true,
      data: data,
    });
  }
  return res.json({
    success: false,
    data: "Embed or guild doesn't exist",
  });
};

export const getGuildEmbeds = async (req, res, next) => {
  const { guildId } = req.params;
  if (isGuildExist(guildId)) {
    const data = await Embed.find({ guildId });
    return res.json({
      success: true,
      data: data,
    });
  }
  return res.json({
    success: false,
    data: "Embed or guild doesn't exist",
  });
};

export const deleteEmbedField = async (req, res, next) => {
  const { embedTag, guildId, fieldId } = req.params;

  if (isGuildExist(guildId)) {
    const embed = await Embed.findOne({ guildId, embed_tag: embedTag });
    if (embed.fields.length) {
      const y = await Embed.updateOne(
        { guildId, embed_tag: embedTag },
        {
          $pull: {
            fields: {
              _id: fieldId,
            },
          },
        },
        { safe: true, multi: true }
      );
      return res.json({
        success: true,
        data: y,
      });
    }
  }
  return res.json({
    success: false,
    data: "Embed or guild doesn't exist",
  });
};
