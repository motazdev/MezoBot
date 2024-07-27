import User from "../../DB/Schema/User.js";
import { asyncHandler } from "../../Utils/errorHandler.js";
import jwt from "jsonwebtoken";
export const isAuthenticated = asyncHandler(async (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token || !token.startsWith("Bearer"))
    return next(new Error("Valid token is required"));

  token = token.split("Bearer ")[1];

  const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);
  if (!decoded) return next(new Error("Token is invalid", { cause: 401 }));
  const checkUser = await User.findOne({
    username: decoded.username,
    id: decoded.id,
  });
  if (!checkUser) return next(new Error("User is invalid", { cause: 401 }));

  return next();
});
