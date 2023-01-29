import { Bot, Context } from "https://deno.land/x/grammy@v1.13.1/mod.ts";
import { hydrateReply, parseMode } from "https://deno.land/x/grammy_parse_mode@1.5.0/mod.ts";
// https://t.me/c/1493653006/107307
import type { ParseModeFlavor } from "https://deno.land/x/grammy_parse_mode@1.5.0/mod.ts";

const bots = new Map<string, Bot<ParseModeFlavor<Context>>>();

export function getBot(token: string) {
    let bot = bots.get(token);
    if (!bot) {
        try {
            bot = new Bot<ParseModeFlavor<Context>>(token, {
                client: {
                    // We accept the drawback of webhook replies for typing status.
                    canUseWebhookReply: (method) => method === "sendChatAction",
                },
            });
            // Install the plugin.
            bot.use(hydrateReply);
            // Sets default parse_mode for ctx.reply
            bot.api.config.use(parseMode("HTML"));
            // save the token
            bots.set(token, bot);
        }
        catch (e) {}
    }
    return bot;
}
