import { Bot, Context, GrammyError, HttpError } from "grammy/mod.ts";
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
