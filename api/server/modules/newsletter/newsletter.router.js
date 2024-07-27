import { Router } from "express";
import { isValid } from "../../helpers/validation.js";
import { newsLetterAddSchema } from "../../validators/newsletter.validation.js";
import { asyncHandler } from "../../../Utils/errorHandler.js";
import { addUser } from "./newsletter.controller.js";
import { isAuthenticated } from "../../middleware/authorization.js";

const router = Router();
router.post(
  "/add",
  isAuthenticated,
  isValid(newsLetterAddSchema),
  asyncHandler(addUser)
);

export default router;
