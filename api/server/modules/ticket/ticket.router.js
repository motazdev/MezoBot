import { Router } from "express";
import {
  ticketData,
  claimedTicketsByUser,
  ticketsData,
  summaryChartData,
} from "./ticket.controller.js";
import { asyncHandler } from "../../../Utils/errorHandler.js";
import { isAuthenticated } from "../../middleware/authorization.js";

const router = Router();

router.get("/guild/:guildId", isAuthenticated, asyncHandler(ticketsData));
router.get(
  "/:guildId/summary-chart-data",
  isAuthenticated,
  asyncHandler(summaryChartData)
);
router.get("/:ticketId", isAuthenticated, asyncHandler(ticketData));
router.get(
  "/claimed/:claimedById",
  isAuthenticated,
  asyncHandler(claimedTicketsByUser)
);

export default router;
