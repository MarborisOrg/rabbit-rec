import { Telegraf } from 'telegraf';
export default function (EnvConfig) {
    const bot = new Telegraf(EnvConfig.tbot_token);
    bot.command('oldschool', (ctx) => ctx.reply('Hello'));
    bot.command('hipster', Telegraf.reply('λ'));
    const sendMessageToUser = (userId) => {
        setInterval(() => {
            echo('Sended');
            void bot.telegram.sendMessage(userId, 'Test');
        }, 5000);
    };
    sendMessageToUser(7366772920);
    void bot.launch();
    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));
}
