import User from "../../DB/Schema/User.js";

const createUser = async (user, role = "user", guildId) => {
  try {
    const check = await User.find({ id: user.id });
    if (check.length) return { error: "User exist" };

    const newUser = await User.create({
      id: user.id,
      username: user.username,
      globalName: user.globalName,
      guildId,
      role,
    });
    return newUser;
  } catch (err) {
    console.log("Err: ", err);
  }
};

export default createUser;
