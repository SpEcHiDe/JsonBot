import { Composer } from "grammy/mod.ts";
import { TG_MAX_MESSAGE_LENGTH, TG_MES_PR, TG_PR_MES } from "./../consts.ts";

export const composer = new Composer();

export default composer;

composer.on("chat_member", async (ctx) => {
    const targetChat = ctx.chatMember.chat.id;
    let msgToSend = TG_MES_PR(ctx.update);
    if (msgToSend.length > TG_MAX_MESSAGE_LENGTH) {
        while (msgToSend.length > TG_MAX_MESSAGE_LENGTH) {
            const io: string = msgToSend.substring(
                0,
                TG_MAX_MESSAGE_LENGTH,
            );
            await ctx.api.sendMessage(
                targetChat,
                TG_PR_MES(msgToSend),
            );
            msgToSend = msgToSend.substring(TG_MAX_MESSAGE_LENGTH);
        }
    }
    return await ctx.api.sendMessage(
        targetChat,
        TG_PR_MES(msgToSend),
    );
});
