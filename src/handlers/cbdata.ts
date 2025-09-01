import { Composer } from "grammy/mod.ts";
import { TG_MES_PR, TG_PR_MES } from "./../consts.ts";

export const composer = new Composer();

export default composer;

composer.on("callback_query", async (ctx) => {
    // NOTE: You should always answer,
    // but we want different conditionals to
    // be able to answer to differently
    // (and we can only answer once)
    // so we don't always answer here.
    await ctx.answerCallbackQuery();
    if (ctx.callbackQuery.data === "(Optional). Data associated with the callback button.") {
        console.log("Test 16");
        await ctx.editMessageText("We try to edit message to something else");
    }
    return ctx.api.sendMessage(
        ctx.callbackQuery.from.id,
        TG_PR_MES(
            TG_MES_PR(
                ctx.update,
            ),
        ),
        {
            parse_mode: "HTML",
        }
    );
});
