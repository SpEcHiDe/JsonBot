import { webhookCallback } from "grammy/web";

import { composer } from "./handlers/app";
import { getBot } from "./bots";


export default {
	async fetch(
		request: Request,
	): Promise<Response> {
		if (request.method === "POST") {
			let { pathname } = new URL(request.url);
			let botToken = pathname.substring(1);
			// Create an instance of the `Bot` class and pass your authentication token to it.
			const bot = getBot(botToken);
			if (bot !== undefined) {
				// You can now register listeners on your bot object `bot`.
				// grammY will call the listeners when users send messages to your bot.
				// Handle the /start command.
				bot.use(composer);
				// finally, register the webhook
				// https://t.me/c/1493653006/49880
				return webhookCallback(bot, "oak")(request);
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
	},
};
