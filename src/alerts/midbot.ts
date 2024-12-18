import readline from "readline";
import { TelegramClient } from "telegram/index.js";
import { StringSession } from "telegram/sessions/index.js";

export class MidBot {
  client: TelegramClient | undefined;
  async start() {
    const stringSession = new StringSession(configs.EnvConfig.MTSession);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    console.log("info: Loading interactive MidBot...");
    this.client = new TelegramClient(
      stringSession,
      configs.EnvConfig.apiId,
      configs.EnvConfig.apiHash,
      {
        connectionRetries: 5,
      }
    );
    await this.client.start({
      phoneNumber: async () =>
        new Promise((resolve) =>
          rl.question("Please enter your number: ", resolve)
        ),
      password: async () =>
        new Promise((resolve) =>
          rl.question("Please enter your password: ", resolve)
        ),
      phoneCode: async () =>
        new Promise((resolve) =>
          rl.question("Please enter the code you received: ", resolve)
        ),
      onError: (err) => console.log(err),
    });
    console.log("Success: You should now be connected.");
    console.log("info: session: " + this.client.session.save());

    this.sendMessageToUser(configs.EnvConfig.adminTelId, "launched")

  }

  async sendMessageToUser(userId: string | number, msg: string) {
    if (!this.client) throw new Error("Bot not starting");
    console.log(msg)
    await this.client.sendMessage(userId, { message: msg });
  }
}
