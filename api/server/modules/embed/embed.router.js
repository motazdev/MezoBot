import { Router } from "express";
import { asyncHandler } from "../../../Utils/errorHandler.js";
import { isValid } from "../../helpers/validation.js";
import { isAuthenticated } from "../../middleware/authorization.js";
import {
  embedUpdateSchema,
  FieldDeleteSchema,
} from "../../validators/guild.validation.js";
import {
  addEmbedField,
  createEmbed,
  deleteEmbedField,
  getGuildEmbed,
  getGuildEmbeds,
  updateEmbed,
} from "./embed.controller.js";

const router = Router({ mergeParams: true });

router.get("/:embedTag", isAuthenticated, getGuildEmbed);
router.get("/", isAuthenticated, getGuildEmbeds);
// router.post("/create/:embedTag", isValid(embedCreateSchema), createEmbed);
router.post("/create/:embedTag", isAuthenticated, createEmbed);
router.post(
  "/addfield/:embedTag",
  isAuthenticated,
  isValid(embedUpdateSchema),
  asyncHandler(addEmbedField)
);
router.post(
  "/update/:embedTag",
  isAuthenticated,
  isValid(embedUpdateSchema),
  asyncHandler(updateEmbed)
);
router.delete(
  "/deletefield/:embedTag/:fieldId",
  isAuthenticated,
  isValid(FieldDeleteSchema),
  asyncHandler(deleteEmbedField)
);

export default router;
