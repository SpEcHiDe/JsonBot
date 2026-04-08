import { Composer } from "grammy/mod.ts";
import { TG_MAX_MESSAGE_LENGTH, TG_MES_PR, TG_PR_MES } from "./../../consts.ts";

export const composer = new Composer();

export default composer;

composer.on(
    [
        "shipping_query",
        "pre_checkout_query",
        "purchased_paid_media",
    ],
    async (ctx) => {
        try {
            const targetUser = ctx.from.id ?? undefined;
            if (targetUser === undefined) {
                return;
            }
            let msgToSend = TG_MES_PR(ctx.update);
            if (msgToSend.length > TG_MAX_MESSAGE_LENGTH) {
                while (msgToSend.length > TG_MAX_MESSAGE_LENGTH) {
                    const io: string = msgToSend.substring(
                        0,
                        TG_MAX_MESSAGE_LENGTH,
                    );
                    await ctx.api.sendMessage(
                        targetUser,
                        TG_PR_MES(io),
                        {
                            parse_mode: "HTML",
                        },
                    );
                    msgToSend = msgToSend.substring(TG_MAX_MESSAGE_LENGTH);
                }
            }
            return await ctx.api.sendMessage(
                targetUser,
                TG_PR_MES(msgToSend),
                {
                    parse_mode: "HTML",
                },
            );
        } catch (_) {
            // TODO: figure out a better logik
        }
    },
);
