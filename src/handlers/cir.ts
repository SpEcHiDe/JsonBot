import { Composer } from "grammy/mod.ts";

export const composer = new Composer();

export default composer;

composer.on("chosen_inline_result", (ctx) => {
    // https://stackoverflow.com/a/3515761/4723940
    let msgToSend = JSON.stringify(
        ctx.update,
        null,
        4
    );
    return ctx.api.sendMessage(
        ctx.chosenInlineResult.from.id,
        `<pre><code class="language-json">${msgToSend}</code></pre>`
    );
});
