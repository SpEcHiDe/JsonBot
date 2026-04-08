import { Composer } from "grammy/mod.ts";
import { TG_MAX_MESSAGE_LENGTH, TG_MES_PR, TG_PR_MES } from "./../../consts.ts";

export const composer = new Composer();

export default composer;

composer.on("callback_query", async (ctx) => {
    // NOTE: You should always answer,
    // but we want different conditionals to
    // be able to answer to differently
    // (and we can only answer once)
    // so we don't always answer here.
    await ctx.answerCallbackQuery();
    let reply_markup = undefined;
    let msgToSend = TG_MES_PR(ctx.update);
    if (msgToSend.length > TG_MAX_MESSAGE_LENGTH) {
        while (msgToSend.length > TG_MAX_MESSAGE_LENGTH) {
            const io: string = msgToSend.substring(
                0,
                TG_MAX_MESSAGE_LENGTH,
            );
            await ctx.reply(
                TG_PR_MES(io),
                {
                    parse_mode: "HTML",
                    reply_markup: reply_markup,
                },
            );
            msgToSend = msgToSend.substring(TG_MAX_MESSAGE_LENGTH);
        }
    }
    return await ctx.reply(
        TG_PR_MES(msgToSend),
        {
            parse_mode: "HTML",
            reply_markup: reply_markup,
        },
    );
});
