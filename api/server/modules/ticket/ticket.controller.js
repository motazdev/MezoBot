import Ticket from "../../../DB/Schema/Ticket.js";

export const ticketsData = async (req, res) => {
  try {
    const { guildId } = req.params;
    const tickets = await Ticket.find({ guildId }).populate([
      {
        path: "claimedBy",
        foreignField: "id",
      },
      {
        path: "createdBy",
        foreignField: "id",
      },
    ]);

    if (tickets.length) {
      res.json({ success: true, data: tickets });
    } else {
      res.json({ success: false, data: { data: "No Tickets Avaliable" } });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
export const ticketData = async (req, res) => {
  const client = req.discordClient;
  const { ticketId } = req.params;

  try {
    const ticket = await Ticket.findById(ticketId).populate([
      {
        path: "claimedBy",
        foreignField: "id",
      },
      {
        path: "createdBy",
        foreignField: "id",
      },
    ]);
    if (ticket) {
      res.json({ success: true, data: ticket });
    }
  } catch (error) {
    console.log("error:: ", error.message);
    res.json({ success: false, message: error.message });
  }
};
export const claimedTicketsByUser = async (req, res) => {
  const client = req.discordClient;
  const { claimedById } = req.params;

  try {
    const ticket = await Ticket.find({ claimedBy: claimedById }).populate([
      {
        path: "claimedBy",
        foreignField: "id",
      },
      {
        path: "createdBy",
        foreignField: "id",
      },
    ]);
    if (ticket) {
      res.json({ success: true, data: ticket });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const summaryChartData = async (req, res) => {
  const client = req.discordClient;
  const { guildId } = req.params;
  const tickets = await Ticket.aggregate([
    {
      $facet: {
        claimed: [
          { $match: { guildId: { $eq: guildId }, status: { $eq: "claimed" } } },
          { $count: "claimed" },
        ],
        closed: [
          { $match: { guildId: { $eq: guildId }, status: { $eq: "closed" } } },
          { $count: "closed" },
        ],
        open: [
          { $match: { guildId: { $eq: guildId }, status: { $eq: "open" } } },
          { $count: "open" },
        ],
      },
    },
    {
      $project: {
        claimed: { $arrayElemAt: ["$claimed.claimed", 0] },
        closed: { $arrayElemAt: ["$closed.closed", 0] },
        open: { $arrayElemAt: ["$open.open", 0] },
      },
    },
  ]);
  if (
    tickets.length &&
    (tickets[0].claimed || tickets[0].open || tickets[0].closed)
  ) {
    return res.json({ success: true, data: tickets[0] });
  } else {
    return res.json({ success: false, data: { data: "No Tickets Avaliable" } });
  }
};
