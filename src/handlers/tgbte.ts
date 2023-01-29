import { Composer, InlineKeyboard } from "https://deno.land/x/grammy@v1.13.1/mod.ts";
import { getBot } from "../bots.js";

const composer = new Composer();

export default composer;

composer.on("msg:text").filter(
    (ctx) => ctx.msg.forward_from?.username?.toLowerCase() === "botfather",
    async (ctx) => {
        let entities = ctx.message?.entities;
        let msgText = ctx.message?.text || "";
        // extract bot token
        let bot_token = extractBotToken(msgText, entities);
        if (bot_token !== undefined) {
            // Create an instance of the `Bot` class and pass your authentication token to it.
            const bot = getBot(bot_token);
            if (bot) {
                try {
                    // Make sure it is `https` not `http`!
                    await bot.api.setWebhook(
                        `${process.env.URL}/${bot_token}`,
                        {
                            drop_pending_updates: true,
                            allowed_updates: [
                                "message",
                                "edited_message",
                                "channel_post",
                                "edited_channel_post",
                                "inline_query",
                                "chosen_inline_result",
                                "callback_query",
                                "poll",
                                "poll_answer",
                                "my_chat_member",
                                "chat_member",
                                "chat_join_request",
                            ],
                        }
                    );
                }
                catch (e) {}
            }
        }
        // finally reply done to the user
        await ctx.replyWithSticker(
            "CAACAgUAAxkBAAEPvDFie_SFX9QPy_PzMr9bOY9LDIbekwAC3wEAAjzLfB_2ory8DFKOUyQE",
            {
                reply_markup: new InlineKeyboard().url(
                    "Source Code",
                    "https://github.com/SpEcHiDe/IDNWB"
                ),
                reply_to_message_id: ctx.message?.message_id,
            }
        );
    }
);

function extractBotToken(msgText: string, entities: any) {
    // https://github.com/wjclub/telegram-bot-tokenextract/pull/1
    for (let entity_ in entities) {
        let entity = entities[Number(entity_)];
        if (entity.type == "code") {
            return msgText?.substring(
                entity.offset,
                entity.offset + entity.length
            );
        }
    }
}
