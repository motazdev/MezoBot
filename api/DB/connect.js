import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const connectDB = async () => {
  return await mongoose
    .connect(process.env.DB_CONNECTION_URL)
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log("DB ERROR", err));
};
