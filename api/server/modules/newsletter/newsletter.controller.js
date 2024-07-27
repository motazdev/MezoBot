import NewsLetterUser from "../../../DB/Schema/NewsLetterUser.js";

export const addUser = async (req, res) => {
  const { email } = req.body;
  const check = await NewsLetterUser.findOne({ email });
  if (check) {
    return res.json({ success: false, data: "Already In Our Newsletter!" });
  }
  const addUser = await NewsLetterUser.create({ email });
  return res.json({ success: true });
};
