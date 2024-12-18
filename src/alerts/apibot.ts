import { Telegraf } from "telegraf";

export class ApiBot {
  bot: Telegraf | undefined;
  start() {
    this.bot = new Telegraf(configs.EnvConfig.tbot_token);
    console.log(configs.EnvConfig.tbot_token);
    this.bot.launch();
    console.log("api launched");
    this.sendMessageToUser(configs.EnvConfig.adminTelId, "launched");
  }

  sendMessageToUser(userId: string | number, txt: string) {
    if (!this.bot) throw new Error("Bot not starting");
    this.bot.telegram.sendMessage(userId, txt);
  }

  stop() {
    if (this.bot) {
      process.once("SIGINT", () => this.bot!.stop("SIGINT"));
      process.once("SIGTERM", () => this.bot!.stop("SIGTERM"));
    }
  }
}
