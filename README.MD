# Discord Bot

Its.. A discord bot, I use it for 
https://discord.gg/tokyoonline

Description
# DiscordBot  

## ✨ Overview  
DiscordBot is a highly modular and permission‑aware Discord system built with **Discord.js v14**.  
It is designed to be **easy to extend**, **secure with permission checks**, and **simple to maintain** while providing a smooth experience for both developers and staff teams.

---

## ✅ Pros  

### ⚡ Modular Slash Command System  
- Commands are **auto‑loaded** from the `commands` and `cogs` folders.  
- New commands can be added by simply dropping a file in – **no core edits required**.  
- Supports both **single‑file commands** and **multi‑command cogs**.

---

### 🔐 Built‑In Permission Checks  
- Every command automatically goes through the `CanRunCommand` system.  
- Restrict usage to specific roles or ranks without touching command code.  
- Prevents unauthorized access to sensitive commands effortlessly.

---

### 📦 Cog‑Based Event Handling  
- Events are fully modular.  
- Cogs can register **multiple events** or single legacy events with minimal boilerplate.  
- Easy to scale as your bot grows in complexity.

---

### 🚀 Automatic Slash Command Registration  
- Slash commands are synced to Discord **on startup**.  
- No manual registration or separate scripts needed.  
- Keeps your commands always up‑to‑date with your code.

---

### 🛡️ Stability & Safety  
- Global error handlers for unhandled rejections and exceptions.  
- Clear logging for command loading, events, and runtime issues.  
- Reduces downtime and simplifies debugging.

---

### 🛠️ Developer Friendly  
- Organized project structure (`commands/`, `cogs/`, `helpers/`).  
- Built‑in helpers like `registerCommand` make it simple to expand.  
- `.env` support for safe and secure configuration.  
- Uses modern Discord.js features (GatewayIntents, Partials, Collections).

---

## 🌟 Summary  
This bot is built for teams that want a **powerful, flexible, and permission‑safe foundation**.  
You can easily add features, keep commands organized, and ensure only the right people can use them—all while benefiting from clean logging and stability safeguards.

> **Perfect for moderation systems, staff tools, or any project needing a reliable Discord backend.**


# DiscordBot Documentation  

## ✨ Overview  
DiscordBot Is A **Modular**, **Permission‑Aware**, And **Developer‑Friendly** Discord System Built With **Discord.js v14**.  
This Documentation Explains **How The Bot Is Structured**, **How Commands And Cogs Are Loaded**, And **What You Need To Do To Add Your Own Features.**

---

## 📂 Project Structure  
root  
│ .env  
│ index.js // Main Bot File  
│ package.json  
│  
├─ commands // Individual Slash Command Files  
│ ping.js  
│ ban.js  
│ …  
│  
├─ cogs // Event‑Driven Or Multi‑Command Files  
│ moderation.js  
│ activityLogger.js  
│ …  
│  
└─ helpers  
RankChecker.js // Permission And Command Registration Helpers  

---

## 🚀 How It Works  

### 🔄 Startup Flow  
1. Environment Setup  
`.env` File Loads Your Token And Secrets  
TOKEN=your-bot-token-here  

2. Client Initialization  
Client Is Created With GatewayIntents And Partials  
Collections For client.Commands And client.Cogs Are Created  

3. Command Loader  
Scans commands Directory And Loads Each File Exporting:  
module.exports = {  
  data: new SlashCommandBuilder().setName('example').setDescription('…'),  
  async execute(interaction) { … }  
}  
Registers Each Command To client.Commands And Adds To slashCommandData  

4. Cog Loader  
Scans cogs Directory And Attaches Events Automatically  

5. Slash Command Registration  
Registers All Commands With:  
await client.application.commands.set(slashCommandData);  

6. Interaction Handling  
Checks Permissions With CanRunCommand Before Executing  

7. Global Error Handling  
Catches unhandledRejection And uncaughtException And Logs Them Without Crashing  

---

## 🛠️ Adding Your Own Command  
Create a new file in commands/:  
const { SlashCommandBuilder } = require('discord.js');  
module.exports = {  
  data: new SlashCommandBuilder()  
    .setName('hello')  
    .setDescription('Replies With A Greeting!'),  
  async execute(interaction) {  
    await interaction.reply('👋 Hello There!');  
  }  
};  
Restart Bot → Command Is Registered Automatically  

---

## 🧩 Adding Your Own Cog  
Create a new file in cogs/:  
module.exports = {  
  name: 'WelcomeCog',  
  events: {  
    guildMemberAdd: async (client, member) => {  
      const channel = member.guild.systemChannel;  
      if (channel) channel.send(`👋 Welcome, ${member}!`);  
    }  
  }  
};  
Restart Bot → Event Handler Is Active  

---

## 🔐 Permission System  
if (!CanRunCommand(interaction, interaction.commandName)) {  
  await interaction.reply({ content: '❌ You Do Not Have Permission.', ephemeral: true });  
  return;  
}  
Edit helpers/RankChecker.js To Customize Permissions  

---

## 💡 Tips  
Restart Bot After Adding Commands Or Cogs  
Test On A Private Server  
Watch Console For ✅ Or ❌ Logs  

---

## 📌 Summary  
✔️ Commands → Add File To commands/, Restart  
✔️ Events → Add File To cogs/, Restart  
✔️ Permissions → Edit RankChecker.js  
✔️ Commands Auto‑Register On Startup  

🚀 Extend Your Bot By Simply Creating A File!
