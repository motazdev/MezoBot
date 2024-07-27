import { Router } from "express";
import { userData, userRoles } from "./user.controller.js";
import { asyncHandler } from "../../../Utils/errorHandler.js";
import { isAuthenticated } from "../../middleware/authorization.js";

const router = Router();

router.get("/:userId", isAuthenticated, asyncHandler(userData));
router.get("/:userId/:guildId/roles", isAuthenticated, asyncHandler(userRoles));

export default router;
