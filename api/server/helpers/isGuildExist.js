import Guild from "../../DB/Schema/Guild.js";

export const isGuildExist = async (guildId) => {
  const isExist = await Guild.findOne({ guildId });
  if (isExist) {
    return true;
  }

  return false;
};
