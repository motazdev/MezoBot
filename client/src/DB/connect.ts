import mongoose from "mongoose";
const connectDB = async () => {
  return await mongoose
    .connect(process.env.MONGODB_URI!)
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log("DB ERROR", err));
};

export default connectDB;
