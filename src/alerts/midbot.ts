import readline from "readline";
import { TelegramClient } from "telegram/index.js";
import { StringSession } from "telegram/sessions/index.js";

export class MidBot {
  client: TelegramClient | undefined;
  async start(EnvConfig: Record<string, any>) {
    const stringSession = new StringSession(EnvConfig.MTSession);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    console.log("Loading interactive example...");
    this.client = new TelegramClient(
      stringSession,
      EnvConfig.apiId,
      EnvConfig.apiHash,
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
    console.log("You should now be connected.");
    console.log("session: " + this.client.session.save());

    this.sendMessageToUser(EnvConfig.adminTelId, "launched")

  }

  async sendMessageToUser(userId: string | number, msg: string) {
    if (!this.client) throw new Error("Bot not starting");
    console.log(msg)
    await this.client.sendMessage(userId, { message: msg });
  }
}
