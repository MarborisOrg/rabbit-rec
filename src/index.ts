import { alertCaller, alertStarter } from './alert.js';
import { Core } from "@marboris/coreutils";

class RabbitMQManager extends Core {
  channel: any;
  Main() {
    this.channel = null;
    globalThis.configs = this.config
  }

  async init() {
    if (!configs.EnvConfig.amqp) {
      throw new Error("[env] amqp is required.");
    }
    try {
      await this.amqpManager.connect(configs.EnvConfig.amqp);
      this.channel = this.amqpManager.getChannel();
      console.log("RabbitMQ connection and channel created.");
    } catch (err) {
      console.error("Error initializing RabbitMQ:", err);
      throw err;
    }
  }

  async rec() {
    const queue = configs.Args.queue
    if (!this.channel || !queue) {
      throw new Error("Channel is not initialized.");
    }

    await this.channel.assertQueue(queue, { durable: true });
    await this.channel.prefetch(1);
    await this.channel.consume(
      queue,
      (message: any) => {
        if (message) {
          const msgContent = JSON.parse(message.content.toString());
          console.log(" [x] Received '%s' from queue '%s'", msgContent, queue);
          void alertCaller(msgContent);
          this.channel.ack(message);
        }
      },
      { noAck: false }
    );
    console.log(
      ` [*] Waiting for messages in queue '${queue}'. To exit press CTRL+C`
    );
  }

  async close() {
    await this.amqpManager.close();
    console.log("RabbitMQ connection closed.");
  }
}

(async () => {
  const rabbitMQManager = new RabbitMQManager();
  await alertStarter()
  try {
    await rabbitMQManager.init();
    await rabbitMQManager.rec();
  } catch (err) {
    console.error("Error occurred during message sending:", err);
  }
})();
