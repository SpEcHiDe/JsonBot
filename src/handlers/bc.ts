import { Composer } from "grammy/mod.ts";
import { TG_MES_PR, TG_PR_MES } from "./../consts.ts";

export const composer = new Composer();

export default composer;

composer.on("business_connection", (ctx) => {
    return ctx.api.sendMessage(
        ctx.businessConnection.user_chat_id,
        TG_PR_MES(
            TG_MES_PR(
                ctx.update,
            ),
        )
    );
});
