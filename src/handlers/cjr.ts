import { Composer, InlineKeyboard } from "grammy";

export const composer = new Composer();

export default composer;

composer.on("chat_join_request", (ctx) => {
    // https://stackoverflow.com/a/3515761/4723940
    let msgToSend = JSON.stringify(
        ctx.update,
        null,
        4
    );
    return ctx.api.sendMessage(
        ctx.chatJoinRequest.from.id,
        `<pre><code class="language-json">${msgToSend}</code></pre>`
    );
});
