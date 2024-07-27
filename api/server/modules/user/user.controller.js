export const userData = async (req, res, next) => {
  const client = req.discordClient;

  try {
    const { userId } = req.params;
    const user = await client.users.fetch(userId);
    res.json({ data: user });
  } catch (error) {
    res.json({ data: error.message });
  }
};

export const userRoles = async (req, res) => {
  const client = req.discordClient;
  const { userId, guildId } = req.params;
  try {
    const guild = await client.guilds.fetch(guildId);

    if (guild) {
      const member = await guild.members.fetch(userId);
      if (member) {
        const memberRoles = member.roles.cache;
        return res.json({ data: memberRoles });
      }
    }
    return res.json({ success: false, message: "Guild Or Member not exists" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
