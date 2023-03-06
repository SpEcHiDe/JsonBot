import { Composer } from "grammy/mod.ts";
import { Message } from "grammy/types.ts";
import {
    MR_INVALID_SYNTAX,
    STICKER_FILE_ID,
    TG_PR_MES,
    TG_ERR_MES,
} from "../consts.ts";
// import { msgUpdate } from "./msg.ts";

export const composer = new Composer();

export default composer;

composer.command(
    "rm",
    async (ctx, next) => {
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
                let ishow: Message = await ctx.replyWithSticker(STICKER_FILE_ID, {
                    reply_markup: oi
                });
                // https://t.me/c/1493653006/116801
                // return await msgUpdate(
                //     {
                //         update: {
                //             message: ishow,
                //         }
                //     }
                // );
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
        // https://t.me/c/1493653006/116753
        await next();
    },
);
