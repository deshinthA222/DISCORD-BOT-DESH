require("dotenv").config();
const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");
const { loadCommands } = require("./handlers/commandHandler");
const { loadEvents } = require("./handlers/eventHandler");
const { handleTicketButton } = require("./handlers/ticketButtons");
const { handleGiveawayButton } = require("./handlers/giveawayButtons");
const { endGiveaway } = require("./utils/giveaway");
const db = require("./database/db");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildVoiceStates
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction, Partials.GuildMember, Partials.User]
});

client.commands = new Collection();

// Namespaced button handlers, routed from events/interactionCreate.js by customId prefix
client.buttonHandlers = new Collection();
client.buttonHandlers.set("ticket", handleTicketButton);
client.buttonHandlers.set("giveaway", handleGiveawayButton);

loadCommands(client);
loadEvents(client);

// Poll every 15s for giveaways whose timer has expired and end them automatically
setInterval(() => {
  const due = db.prepare("SELECT * FROM giveaways WHERE ended = 0 AND ends_at <= ?").all(Date.now());
  for (const giveaway of due) {
    endGiveaway(client, giveaway).catch((err) => console.error("[GIVEAWAY]", err));
  }
}, 15000);

client.login(process.env.DISCORD_TOKEN);
