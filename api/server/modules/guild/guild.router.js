import { Router } from "express";
import {
  getSingleGuild,
  getGuildRoles,
  guildStaffMembers,
  getGuildMembers,
  updateGuildSettings,
  checkBotExists,
  guildStaff,
} from "./guild.controller.js";
import embedRouter from "../embed/embed.router.js";
import { asyncHandler } from "../../../Utils/errorHandler.js";
import { isAuthenticated } from "../../middleware/authorization.js";
const router = Router();
router.get("/:guildId", isAuthenticated, getSingleGuild);
router.get("/:guildId/staff", isAuthenticated, guildStaff);
router.use("/:guildId/embed", embedRouter);

router.get("/:guildId/roles", isAuthenticated, getGuildRoles);
router.post(
  "/:guildId/settings",
  isAuthenticated,
  asyncHandler(updateGuildSettings)
);

router.get("/:guildId/members", isAuthenticated, asyncHandler(getGuildMembers));
router.get("/:guildId/bot-exist", asyncHandler(checkBotExists));

export default router;
