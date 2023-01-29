import { webhookCallback, GrammyError, HttpError } from "https://deno.land/x/grammy@v1.13.1/mod.ts";
import { serve } from "https://deno.land/std@0.154.0/http/server.ts";
import { composer } from "./handlers/app";
import { getBot } from "./bots";


serve(async (req) => {
    if (req.method === "POST") {
        const { pathname } = new URL(req.url);
        let botToken = pathname.substring(1);
        try {
            // Create an instance of the `Bot` class and pass your authentication token to it.
		    const bot = getBot(botToken);
            if (!!bot) {
                // You can now register listeners on your bot object `bot`.
                // grammY will call the listeners when users send messages to your bot.
                // Handle the /start command.
                bot.use(composer);
                // https://grammy.dev/guide/errors.html#catching-errors
                bot.catch((err) => {
                    const ctx = err.ctx;
                    console.error(`Error while handling update ${ctx.update.update_id}:`);
                    const e = err.error;
                    if (e instanceof GrammyError) {
                        console.error("Error in request:", e.description);
                    } else if (e instanceof HttpError) {
                        console.error("Could not contact Telegram:", e);
                    } else {
                        console.error("Unknown error:", e);
                    }
                });
                // finally, register the webhook
                // https://t.me/c/1493653006/49880
                return await webhookCallback(bot, "std/http")(req);
                // https://t.me/c/1493653006/106981
            }
        } catch (err) {
            console.error(err);
        }
    }
    return Response.redirect("https://t.me/SpEcHlDe/1348");
});
