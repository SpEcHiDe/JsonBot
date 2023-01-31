import { Bot, Context } from "https://deno.land/x/grammy@v1.13.1/mod.ts";

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
            bot.api.config.use(
                (prev, method, payload, signal) => {
                    // fd0ced7adf9e8bdad778f2900da89745ce0a409e
                    if (!payload || "parse_mode" in payload) {
                        return prev(method, payload, signal);
                    }
                    let im = {
                        ...payload,
                        ...{
                            parse_mode: "HTML"
                        }
                    };
                    // https://t.me/c/1493653006/107710
                    if (
                        "answerInlineQuery" === method &&
                        "results" in payload
                    ) {
                        for (let thenga in payload.results) {
                            let thengaa = payload.results[thenga];
                            if (
                                "input_message_content" in thengaa &&
                                !("parse_mode" in thengaa.input_message_content)
                            ) {
                                im.results[thenga].input_message_content.parse_mode = "HTML";
                            }
                            else if (
                                !("parse_mode" in thengaa)
                            ) {
                                im.results[thenga].parse_mode = "HTML";
                            }
                        }
                    }
                    // fd0ced7adf9e8bdad778f2900da89745ce0a409e
                    return prev(
                        method,
                        im,
                        signal,
                    );
                }
            );
            // save the token
            bots.set(token, bot);
        }
        catch (e) {}
    }
    return bot;
}
