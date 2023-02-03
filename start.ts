import { webhookCallback } from "grammy/mod.ts";
import { serve } from "std/http/server.ts";
import { composer } from "./src/handlers/app.ts";
import { getBot } from "./src/bots.ts";
import { TG_ALLOWED_UPDATES, TG_ENV_S } from "./src/consts.ts";

if (TG_ENV_S.LP) {
  // Create an instance of the `Bot` class and pass your authentication token to it.
  const bot = getBot(TG_ENV_S.TG_BOT_TOKEN);
  if (!!bot) {
    // You can now register listeners on your bot object `bot`.
    // grammY will call the listeners when users send messages to your bot.
    // Handle the /start command.
    bot.use(composer);
    // start bot
    bot.start({
      drop_pending_updates: true,
      allowed_updates: TG_ALLOWED_UPDATES,
    });
    // stop bot
    Deno.addSignalListener("SIGINT", () => bot.stop());
    Deno.addSignalListener("SIGTERM", () => bot.stop());
  }
} else {
  serve(async (req) => {
    // 2016e33165779f658433ef106e12e70d4e5bc2da
    console.log("received ", req);
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
          // finally, register the webhook
          // https://t.me/c/1493653006/49880
          return await webhookCallback(bot, "std/http")(req);
          // https://t.me/c/1493653006/106981
        }
      } catch (err) {
        console.error(err);
        return new Response(
          JSON.stringify({
            "method": "sendMessage",
            "chat_id": TG_ENV_S.OWCID,
            "text": err.toString().substring(0, 4095),
          }),
          {
            status: 200,
          },
        );
      }
    }
    return Response.redirect("https://t.me/SpEcHlDe/1348");
  });
}
