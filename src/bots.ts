import { Bot, Context } from "grammy/mod.ts";
import { parseMode } from "parse_mode";

const bots = new Map<string, Bot<Context>>();

export function getBot(token: string) {
    let bot = bots.get(token);
    if (!bot) {
        try {
            bot = new Bot<Context>(token, {
                client: {
                    // We accept the drawback of webhook replies for typing status.
                    canUseWebhookReply: (method) => method === "sendChatAction",
                },
            });
            // Sets default parse_mode for ctx.reply
            bot.api.config.use(parseMode("HTML"));
            // save the token
            bots.set(token, bot);
        }
        catch (e) {}
    }
    return bot;
}
