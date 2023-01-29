import { webhookCallback, GrammyError, HttpError } from "grammy/web";

import { composer } from "./handlers/app";
import { getBot } from "./bots";


addEventListener('fetch', event => {
	if (event.request.method === "POST") {
		let { pathname } = new URL(event.request.url);
		let botToken = pathname.substring(1);
		// Create an instance of the `Bot` class and pass your authentication token to it.
		const bot = getBot(botToken);
		if (bot !== undefined) {
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
			return webhookCallback(bot, "cloudflare")(event);
			// https://t.me/c/1493653006/106981
		}
		let response: any = {};
		return new Response(
			JSON.stringify(response),
			{
				headers: {
					"Content-Type": "application/json; charset=UTF-8",
				}
			}
		);
	}
	return Response.redirect("https://t.me/SpEcHlDe/1348");
});
