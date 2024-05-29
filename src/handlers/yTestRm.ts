import { Composer } from "grammy/mod.ts";
import { Message } from "grammy/types.ts";
import {
    MR_INVALID_SYNTAX,
    STICKER_FILE_ID,
    TG_ERR_MES,
    TG_PR_MES,
} from "../consts.ts";
import { MyContext } from "../ctx.flavour.ts";
// import { msgUpdate } from "./msg.ts";

export const composer = new Composer<MyContext>();

export default composer;

composer.command(
    "rm",
    async (ctx, next) => {
        const io = ctx.match;
        if (io) {
            let oi = {};
            //
            try {
                oi = JSON.parse(io);
            } catch (error) {
                return await ctx.reply(
                    TG_PR_MES(
                        TG_ERR_MES(error.toString()),
                    ),
                );
            }
            try {
                let ishow = undefined;
                if (ctx.botConfig.botMode.indexOf("T") === -1) {
                    ishow = await ctx.replyWithSticker(
                        STICKER_FILE_ID,
                        {
                            // @ts-ignore
                            reply_markup: oi,
                        },
                    );
                }
                else {
                    ishow = await ctx.reply(
                        `<code>${STICKER_FILE_ID}</code>`,
                        {
                            // @ts-ignore
                            reply_markup: oi,
                            parse_mode: "HTML"
                        },
                    );
                }
                
                // https://t.me/c/1493653006/116801
                // return await msgUpdate(
                //     {
                //         update: {
                //             message: ishow,
                //         }
                //     }
                // );
            } catch (error) {
                await ctx.reply(
                    TG_PR_MES(
                        TG_ERR_MES(error),
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
