import Guild from "../../../DB/Schema/Guild.js";
import User from "../../../DB/Schema/User.js";

export const getSingleGuild = async (req, res, next) => {
  const { guildId } = req.params;
  const guild = await Guild.findOne({ guildId });
  if (guild) {
    return res.json({
      success: true,
      data: guild,
    });
  }
  return res.json({
    success: false,
    message: "guild not found",
  });
};

export const getGuildRoles = async (req, res, next) => {
  const { guildId } = req.params;
  const client = req.discordClient;
  const guild = client.guilds.fetch(guildId);
  const roles = guild.roles;
  return res.json({
    success: true,
    data: roles,
  });
};
export const guildStaffMembers = async (req, res, next) => {
  const { guildId } = req.params;
  const isActiveGuild = await Guild.findOne({ guildId });
  if (isActiveGuild) {
    const staff = await User.find({ guildId, role: "admin" });

    if (staff.length) {
      return res.json({
        success: true,
        data: staff,
      });
    } else {
      return res.json({
        success: false,
        data: { message: "No Staff Exists" },
      });
    }
  } else {
    return res.json({
      success: false,
      data: { message: "Guild Doesn't Exists" },
    });
  }
};
export const guildStaff = async (req, res, next) => {
  const { guildId } = req.params;
  const client = req.discordClient;
  const isActiveGuild = await Guild.findOne({ guildId });
  if (isActiveGuild) {
    const guild = await client.guilds.fetch(guildId);
    await guild.members.fetch();

    const membersWithRoles = guild.members.cache.filter((member) =>
      isActiveGuild.staff_roles?.every((roleId) =>
        member.roles.cache.has(roleId)
      )
    );
    const membersWithRolesWithUsername = membersWithRoles.map((member) => ({
      ...member.user,
      ...member,
    }));
    return res.json({
      success: true,
      data: membersWithRolesWithUsername,
    });
  } else {
    return res.json({
      success: false,
      data: { message: "Guild Doesn't Exists" },
    });
  }
};

// get guild members
export const getGuildMembers = async (req, res, next) => {
  const client = req.discordClient;
  const { guildId } = req.params;
  const guild = await client.guilds.fetch(guildId);
  const usersList = await guild.members.fetch();

  const members = usersList.map((u) => {
    const memberRoles = u.roles.cache;
    u.user["roles"] = memberRoles;
    return u.user;
  });

  const membersFiltered = members.filter((member) => !member.bot);
  return res.json({
    success: true,
    data: membersFiltered,
  });
};

export const updateGuildSettings = async (req, res) => {
  const { guildId } = req.params;
  const { categoryId, staff_roles } = req.body;
  const guild = await Guild.findOne({ guildId });

  if (!guild || (!staff_roles && !categoryId))
    return res.json({
      success: false,
      message: "Guild doesn't exist or insufficient data",
    });
  const updateGuild = await Guild.findOneAndUpdate(
    { guildId },
    {
      categoryId,
      staff_roles,
    },
    { new: true }
  );
  return res.json({ success: true, data: "Guild updated successfully" });
};

export const checkBotExists = async (req, res) => {
  const { guildId } = req.params;
  const client = req.discordClient;

  const guild = await Guild.findOne({ guildId });

  if (!guild)
    return res.json({
      success: false,
      message: "Guild doesn't exist or insufficient data",
    });
  const clientGuild = await client.guilds.fetch(guildId);
  const usersList = await clientGuild.members.fetch();

  const isBotExist = usersList.filter(
    (user) => user.user.id == client.application.id
  );

  return res.json({
    success: !!isBotExist.size,
  });
};
