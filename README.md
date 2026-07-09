# DESH Bot

A multi-purpose Discord bot scaffold built with discord.js v14, slash commands, and SQLite (via better-sqlite3). Built as a foundation for the full feature list — moderation, member management, tickets, giveaways, reaction roles, leveling, economy, fun, and utility — with 29 working commands ready to run, structured so more can be added quickly.

## What's implemented right now

- **Moderation**: `/ban`, `/kick`, `/timeout`, `/untimeout`, `/warn`, `/warnings` (view/clear), `/purge`, `/slowmode`, `/lock`, `/unlock`
- **Member Management**: autorole, welcome/goodbye messages, join/leave logs — all configured via `/settings`
- **Tickets**: `/ticket-panel` posts a button; opening creates a private channel, with Claim/Close buttons
- **Giveaways**: `/gstart`, `/gend`, `/greroll` — button-based entry, auto-ends on timer (checked every 15s)
- **Reaction Roles**: `/reactionrole-add` binds an emoji on a message to a role
- **Leveling**: automatic XP on messages, `/rank`, `/leaderboard`
- **Economy**: `/balance`, `/daily`, `/work`, `/baltop`
- **Fun**: `/8ball`, `/coinflip`, `/dice`
- **Utility**: `/ping`, `/userinfo`, `/serverinfo`, `/avatar`

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create your bot** at https://discord.com/developers/applications, enable these Privileged Gateway Intents: `Server Members Intent` and `Message Content Intent`.

3. **Configure environment** — copy `.env.example` to `.env` and fill in:
   ```
   DISCORD_TOKEN=your_bot_token
   CLIENT_ID=your_application_client_id
   GUILD_ID=your_test_server_id   # optional but recommended for instant command sync while testing
   ```

4. **Register slash commands**
   ```bash
   npm run deploy
   ```

5. **Run the bot**
   ```bash
   npm start
   ```

The database (`database/bot.db`) is created automatically on first run — no manual setup needed.

## Project structure

```
discord-bot/
  index.js                 # entry point: client setup, handler loading, giveaway ticker
  deploy-commands.js        # registers slash commands with Discord
  config.js                 # colors, brand text, tunable numbers (XP, economy amounts)
  database/
    db.js                   # better-sqlite3 connection
    schema.sql               # all tables
  handlers/
    commandHandler.js        # loads every command file into client.commands
    eventHandler.js           # loads every event file
    ticketButtons.js          # open/claim/close logic for ticket buttons
    giveawayButtons.js        # enter/leave logic for giveaway buttons
  events/                    # ready, interactionCreate, member join/leave, messages, reactions
  commands/                  # one folder per category, one file per command
  utils/                     # embeds, permissions, economy, giveaway helpers
```

## Adding a new command

Drop a new file in the right `commands/<category>/` folder following this shape, then run `npm run deploy` again:

```js
const { SlashCommandBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder().setName("example").setDescription("..."),
  async execute(interaction) {
    await interaction.reply("Hello!");
  }
};
```

## Not yet built (from your full feature list)

These are the categories from the original list not yet covered — good candidates for the next pass:
- Anti-spam / anti-link / anti-invite / anti-raid, auto-moderation, word filter
- Account age check, nickname management, verification system
- Full server logs (message edit/delete, role updates, channel create/delete, voice join/leave, emoji/invite log, audit log viewer)
- Ticket transcripts, auto-delete closed tickets, multiple support categories
- Button/dropdown reaction roles (currently emoji-reaction only), color/game/notification role presets
- Embed builder, poll system, reminders, invite info, role/channel info, uptime/bot stats
- Music (needs a voice library like `@discordjs/voice` + `ytdl-core` or similar — bigger addition)
- Gambling commands, deposit/withdraw, shop/inventory
- Trivia, guess-the-number, meme/joke/GIF search (need an external API or meme dataset)
- AI chat/image/summarize/translate/code helper (would call the Anthropic API or another provider)
- Voice XP, temporary voice channels, AFK system
- Backup/restore server, permission checker
- Custom prefix + text-command support, maintenance mode, command enable/disable, Sinhala/English localization
- YouTube/Twitch/TikTok notifications, RSS, GitHub notifications, weather/news (each needs its own API integration)
- Dev tools: eval, error logger, command logger, performance monitor

Tell me which of these to tackle next and I'll build them into this same structure.
