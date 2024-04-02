import { Composer } from "grammy/mod.ts";
import { MessageEntity } from "grammy/types.ts";
import { getBot } from "../bots.ts";
import {
    CLONE_MANGO_STICKER_FILE_ID,
    TG_ALLOWED_UPDATES,
    TG_ENV_S,
} from "../consts.ts";

const composer = new Composer();

export default composer;

composer.on("msg:text").filter(
    (ctx) => (
        ctx.msg.forward_origin !== undefined &&
        ctx.msg.forward_origin.type == "user" &&
        ctx.msg.forward_origin.sender_user.username?.toLowerCase() === "botfather"
    ),
    async (ctx, next) => {
        const entities = ctx.message?.entities || [];
        const msgText = ctx.message?.text || "";
        // extract bot token
        const bot_token = extractBotToken(msgText, entities);
        if (bot_token !== undefined) {
            // Create an instance of the `Bot` class and pass your authentication token to it.
            const bot = getBot("P", bot_token);  // TODO
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
            CLONE_MANGO_STICKER_FILE_ID,
            {
                reply_to_message_id: ctx.message?.message_id,
            },
        );
        // https://t.me/c/1493653006/116753
        await next();
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
