import { Composer } from "grammy/mod.ts";
import { TG_MES_PR } from "./../consts.ts";

export const composer = new Composer();

export default composer;

composer.on("callback_query", (ctx) => {
    let msgToSend = TG_MES_PR(ctx.update);
    return ctx.api.sendMessage(
        ctx.callbackQuery.from.id,
        `<pre><code class="language-json">${msgToSend}</code></pre>`
    );
});
