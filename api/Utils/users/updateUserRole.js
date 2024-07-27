import User from "../../DB/Schema/User.js";

const updateUserRole = async (user, role, guildId) => {
  try {
    const check = await User.find({ id: user.id });
    if (!check.length) return { error: "User Doesn't Exist" };

    const updateUser = await User.findOneAndUpdate(
      {
        id: user.id,
        guildId,
      },
      { role },
      { new: true }
    );
    return updateUser;
  } catch (err) {
    console.log("Err: ", err);
  }
};

export default updateUserRole;
