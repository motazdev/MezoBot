import guildRouter from "./modules/guild/guild.router.js";
import userRouter from "./modules/user/user.router.js";
import ticketRouter from "./modules/ticket/ticket.router.js";
import newsLetterRouter from "./modules/newsletter/newsletter.router.js";
const apiVersion = "/api/v1";

const appRouter = (app, express, getDiscordClient) => {
  app.use(`${apiVersion}/guild`, getDiscordClient, guildRouter);
  app.use(`${apiVersion}/user`, getDiscordClient, userRouter);
  app.use(`${apiVersion}/ticket`, getDiscordClient, ticketRouter);
  app.use(`${apiVersion}/newsletter`, getDiscordClient, newsLetterRouter);

  app.use((error, req, res, next) => {
    const errCode = req.cause || 500;
    return res.status(errCode).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  });

  app.all("*", (req, res, next) => {
    return res.status(404).json({ success: false, message: "Page not found" });
  });
};

export default appRouter;
