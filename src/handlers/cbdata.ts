import { Composer } from "grammy/mod.ts";
import { TG_MES_PR, TG_PR_MES } from "./../consts.ts";

export const composer = new Composer();

export default composer;

composer.on("callback_query", (ctx) => {
    // NOTE: You should always answer,
    // but we want different conditionals to
    // be able to answer to differnetly
    // (and we can only answer once),

  
    // so we don't always answer here.

    await ctx.answerCallbackQuery();
    return ctx.api.sendMessage(
        ctx.callbackQuery.from.id,
        TG_PR_MES(
            TG_MES_PR(
                ctx.update,
            ),
        ),
    );
});
