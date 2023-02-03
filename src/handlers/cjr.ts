import { Composer } from "grammy/mod.ts";
import { TG_MES_PR, TG_PR_MES } from "./../consts.ts";

export const composer = new Composer();

export default composer;

composer.on("chat_join_request", (ctx) => {
    return ctx.api.sendMessage(
        ctx.chatJoinRequest.from.id,
        TG_PR_MES(
            TG_MES_PR(
                ctx.update,
            ),
        ),
    );
});
