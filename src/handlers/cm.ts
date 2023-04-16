import { Composer } from "grammy/mod.ts";
import { TG_MAX_MESSAGE_LENGTH, TG_MES_PR, KW_TG_SM } from "./../consts.ts";

export const composer = new Composer();

export default composer;

composer.on(
    [
        "my_chat_member",
        "chat_member",
    ],
    async (ctx) => {
        try {
            let targetChat = 0;
            if (ctx.chatMember) {
                targetChat = ctx.chatMember.chat.id;
            }
            else if (ctx.myChatMember) {
                targetChat = ctx.myChatMember.chat.id;
            }
            let msgToSend = TG_MES_PR(ctx.update);
            if (msgToSend.length > TG_MAX_MESSAGE_LENGTH) {
                while (msgToSend.length > TG_MAX_MESSAGE_LENGTH) {
                    const io: string = msgToSend.substring(
                        0,
                        TG_MAX_MESSAGE_LENGTH,
                    );
                    await KW_TG_SM(
                        ctx,
                        targetChat,
                        io,
                    );
                    msgToSend = msgToSend.substring(TG_MAX_MESSAGE_LENGTH);
                }
            }
            return await KW_TG_SM(
                ctx,
                targetChat,
                msgToSend,
            );
        } catch (_) {}
    },
);
