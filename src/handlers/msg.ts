import { Composer } from "https://deno.land/x/grammy@v1.13.1/mod.ts";
import { TG_MAX_MESSAGE_LENGTH } from "./../consts.ts";

export const composer = new Composer();

export default composer;

composer.on(
    // https://t.me/c/1493653006/107322
    [
        "message",
        "edited_message",
        "channel_post",
        "edited_channel_post",
    ],
    (ctx) => {
        // https://stackoverflow.com/a/3515761/4723940
        let msgToSend = JSON.stringify(
            ctx.update,
            null,
            4
        );
        if (msgToSend.length > TG_MAX_MESSAGE_LENGTH) {
            while (msgToSend.length > TG_MAX_MESSAGE_LENGTH) {
                let io: string = msgToSend.substring(0, TG_MAX_MESSAGE_LENGTH);
                ctx.reply(
                    `<pre><code class="language-json">${io}</code></pre>`
                );
                msgToSend = msgToSend.substring(TG_MAX_MESSAGE_LENGTH);
            }
        }
        return ctx.reply(
            `<pre><code class="language-json">${msgToSend}</code></pre>`
        );
    }
);
