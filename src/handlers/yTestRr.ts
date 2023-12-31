import { Composer } from "grammy/mod.ts";
import { ReactionTypeCustomEmoji, ReactionTypeEmoji } from "grammy/types.ts";
import { MR_INVALID_SYNTAX, TG_ERR_MES, TG_PR_MES } from "../consts.ts";

export const composer = new Composer();

export default composer;

composer.command(
    "rr",
    async (ctx, next) => {
        const io = ctx.match;
        if (io) {
            let oi: ReactionTypeEmoji | ReactionTypeCustomEmoji | undefined =
                undefined;
            try {
                parseInt(io);
                oi = {
                    type: "custom_emoji",
                    custom_emoji_id: io,
                };
            } catch (_) {
                oi = {
                    type: "emoji",
                    // @ts-ignore
                    emoji: io,
                };
            }
            if (oi !== undefined) {
                try {
                    await ctx.api.setMessageReaction(
                        ctx.msg.chat.id,
                        ctx.msg.message_id,
                        [oi],
                        {
                            is_big: true,
                        },
                    );
                } catch (error) {
                    await ctx.reply(
                        TG_PR_MES(
                            TG_ERR_MES(error),
                        ),
                    );
                }
            } else {
                await ctx.reply(
                    TG_PR_MES(
                        TG_ERR_MES({
                            "error": true,
                            "message": "invalid ReactionType",
                        }),
                    ),
                );
            }
        } else {
            await ctx.reply(MR_INVALID_SYNTAX);
        }
        // https://t.me/c/1493653006/116753
        await next();
    },
);
