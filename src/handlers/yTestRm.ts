import { Composer } from "grammy/mod.ts";
import {
    MR_INVALID_SYNTAX,
    STICKER_FILE_ID,
    TG_PR_MES,
    TG_ERR_MES,
} from "../consts.ts";

export const composer = new Composer();

export default composer;

composer.command(
    "rm",
    async (ctx) => {
        const io = ctx.message?.text?.substring(3).trim();
        if (io) {
            let oi = {};
            try {
                oi = JSON.parse(io);
            }
            catch (error) {
                return await ctx.reply(
                    TG_PR_MES(
                        TG_ERR_MES(error.toString())
                    )
                );
            }
            try {
                await ctx.replyWithSticker(STICKER_FILE_ID, {
                    reply_markup: oi
                });
            }
            catch (error) {
                await ctx.reply(
                    TG_PR_MES(
                        TG_ERR_MES(error)
                    )
                );
            }
        }
        else {
            await ctx.reply(MR_INVALID_SYNTAX);
        }
    },
);
