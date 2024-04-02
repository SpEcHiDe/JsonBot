import { Composer, Context } from "grammy/mod.ts";
import { TG_MAX_MESSAGE_LENGTH, TG_MES_PR, TG_PR_MES } from "./../consts.ts";

export const composer = new Composer();

export default composer;

export async function msgUpdate(ctx: Context) {
    let msgToSend = TG_MES_PR(ctx.update);
    if (msgToSend.length > TG_MAX_MESSAGE_LENGTH) {
        while (msgToSend.length > TG_MAX_MESSAGE_LENGTH) {
            const io: string = msgToSend.substring(
                0,
                TG_MAX_MESSAGE_LENGTH,
            );
            await ctx.reply(
                TG_PR_MES(io),
            );
            msgToSend = msgToSend.substring(TG_MAX_MESSAGE_LENGTH);
        }
    }
    return await ctx.reply(
        TG_PR_MES(msgToSend),
    );
}

composer.on(
    // https://t.me/c/1493653006/107322
    [
        "message",
        "edited_message",
        "channel_post",
        "edited_channel_post",
        "business_message",
        "edited_business_message",
        "deleted_business_messages",
    ],
    msgUpdate,
);
