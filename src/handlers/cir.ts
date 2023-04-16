import { Composer } from "grammy/mod.ts";
import { TG_MES_PR, KW_TG_SM } from "./../consts.ts";

export const composer = new Composer();

export default composer;

composer.on("chosen_inline_result", (ctx) => {
    return KW_TG_SM(
        ctx,
        ctx.chosenInlineResult.from.id,
        TG_MES_PR(
            ctx.update,
        ),
    );
});
