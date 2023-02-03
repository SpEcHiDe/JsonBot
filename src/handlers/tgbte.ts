import { Composer, InlineKeyboard } from "grammy/mod.ts";
import { MessageEntity } from "grammy/types.ts";
import { getBot } from "../bots.ts";
import { TG_ALLOWED_UPDATES, TG_ENV_S } from "../consts.ts";

const composer = new Composer();

export default composer;

composer.on("msg:text").filter(
    (ctx) => ctx.msg.forward_from?.username?.toLowerCase() === "botfather",
    async (ctx) => {
        const entities = ctx.message?.entities || [];
        const msgText = ctx.message?.text || "";
        // extract bot token
        const bot_token = extractBotToken(msgText, entities);
        if (bot_token !== undefined) {
            // Create an instance of the `Bot` class and pass your authentication token to it.
            const bot = getBot(bot_token);
            if (bot) {
                try {
                    // Make sure it is `https` not `http`!
                    await bot.api.setWebhook(
                        `${TG_ENV_S.URL}/${bot_token}`,
                        {
                            drop_pending_updates: true,
                            allowed_updates: TG_ALLOWED_UPDATES,
                        },
                    );
                } catch (_e) {
                    // console.log(_e);
                }
            }
        }
        // finally reply done to the user
        await ctx.replyWithSticker(
            "CAACAgUAAxkBAAEPvDFie_SFX9QPy_PzMr9bOY9LDIbekwAC3wEAAjzLfB_2ory8DFKOUyQE",
            {
                reply_markup: new InlineKeyboard().url(
                    "Source Code",
                    "https://github.com/SpEcHiDe/IDNWB",
                ),
                reply_to_message_id: ctx.message?.message_id,
            },
        );
    },
);

function extractBotToken(msgText: string, entities: Array<MessageEntity>) {
    // https://github.com/wjclub/telegram-bot-tokenextract/pull/1
    for (const entity_ in entities) {
        const entity = entities[Number(entity_)];
        if (entity.type == "code") {
            return msgText?.substring(
                entity.offset,
                entity.offset + entity.length,
            );
        }
    }
}
