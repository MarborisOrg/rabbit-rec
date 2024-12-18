import { Telegraf } from "telegraf";

export class ApiBot {
  bot;
  start(EnvConfig) {
    this.bot = new Telegraf(EnvConfig.tbot_token);
    console.log(EnvConfig.tbot_token)
    this.bot.launch();
    console.log('api launched')
    this.sendMessageToUser(EnvConfig.adminTelId, "launched")
  }

  sendMessageToUser(userId, txt) {
    if(!this.bot) throw new Error("Bot not starting")
    this.bot.telegram.sendMessage(userId, txt);
  }

  stop() {
    process.once("SIGINT", () => bot.stop("SIGINT"));
    process.once("SIGTERM", () => bot.stop("SIGTERM"));
  }
}
