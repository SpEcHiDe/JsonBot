import { Composer } from "grammy/mod.ts";
import { TG_MES_PR, KW_TG_SM } from "./../consts.ts";

export const composer = new Composer();

export default composer;

composer.on("callback_query", async (ctx) => {
    // NOTE: You should always answer,
    // but we want different conditionals to
    // be able to answer to differently
    // (and we can only answer once)
    // so we don't always answer here.
    await ctx.answerCallbackQuery();
    return await KW_TG_SM(
        ctx,
        ctx.callbackQuery.from.id,
        TG_MES_PR(
            ctx.update,
        ),
    );
});
