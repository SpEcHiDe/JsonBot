import { Bot, GrammyError, HttpError } from "grammy/mod.ts";
import { MyContext } from "./ctx.flavour.ts";

const bots = new Map<string, Bot<MyContext>>();

export function getBot(mode: string, token: string) {
    let bot = bots.get(token);
    if (!bot) {
        try {
            bot = new Bot<MyContext>(token, {
                client: {
                    // We accept the drawback of webhook replies for typing status.
                    canUseWebhookReply: (method) => method === "sendChatAction",
                    // customized build urls
                    buildUrl: (root: string, token: string, method: string) => {
                        if (mode === "B") {
                            return `${root}/beta/bot${token}/${method}`;
                        } else if (mode === "BT") {
                            return `${root}/beta/bot${token}/test/${method}`;
                        } /* https://t.me/c/1014048870/115877 */
                        else if (mode === "T") {
                            return `${root}/bot${token}/test/${method}`;
                        } else {
                            return `${root}/bot${token}/${method}`;
                        }
                    },
                },
            });
            // https://t.me/grammyjs/116198
            bot.use(async (ctx, next): Promise<void> => {
				// take time before
				// const before = Date.now(); // milliseconds
				// set token attribute
				ctx.botConfig = {
                    // TODO
					botToken: token,
					botMode: mode,
				};
				// invoke downstream middleware
				await next(); // make sure to `await`!
				// take time after
				// const after = Date.now(); // milliseconds
				// log difference
				// console.log(`Response time: ${after - before} ms`);
			});
            // https://grammy.dev/guide/errors.html#catching-errors
            bot.catch((err) => {
                const ctx = err.ctx;
                console.error("Error while handling update ", ctx.update);
                const e = err.error;
                if (e instanceof GrammyError) {
                    console.error("Error in request:", e.description);
                } else if (e instanceof HttpError) {
                    console.error("Could not contact Telegram:", e);
                } else {
                    console.error("Unknown error:", e);
                }
            });
            // save the token
            bots.set(token, bot);
        } catch (_e) {
            // console.log(_e);
        }
    }
    return bot;
}
