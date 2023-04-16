import { Composer, Context } from "grammy/mod.ts";
import { TG_MAX_MESSAGE_LENGTH, TG_MES_PR, KW_TG_SM } from "./../consts.ts";

export const composer = new Composer();

export default composer;

export async function msgUpdate(ctx: Context) {
    let msgToSend = TG_MES_PR(ctx.update);
    let userId = 0;
    if (ctx.message) {
        userId = ctx.message.from.id;
    }
    else if (ctx.editedMessage) {
        userId = ctx.editedMessage.from.id;
    }
    else if (ctx.channelPost) {
        userId = ctx.channelPost.chat.id;
    }
    else if (ctx.editedChannelPost) {
        userId = ctx.editedChannelPost.chat.id;
    }
    if (msgToSend.length > TG_MAX_MESSAGE_LENGTH) {
        while (msgToSend.length > TG_MAX_MESSAGE_LENGTH) {
            const io: string = msgToSend.substring(
                0,
                TG_MAX_MESSAGE_LENGTH,
            );
            await KW_TG_SM(
                ctx,
                userId,
                io
            );
            msgToSend = msgToSend.substring(TG_MAX_MESSAGE_LENGTH);
        }
    }
    return await KW_TG_SM(
        ctx,
        userId,
        msgToSend
    );
}

composer.on(
    // https://t.me/c/1493653006/107322
    [
        "message",
        "edited_message",
        "channel_post",
        "edited_channel_post",
    ],
    msgUpdate,
);
