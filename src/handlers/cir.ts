import { Composer } from "grammy/mod.ts";
import { TG_MES_PR, TG_PR_MES } from "./../consts.ts";

export const composer = new Composer();

export default composer;

composer.on("chosen_inline_result", (ctx) => {
  return ctx.api.sendMessage(
    ctx.chosenInlineResult.from.id,
    TG_PR_MES(
      TG_MES_PR(
        ctx.update,
      ),
    ),
  );
});
