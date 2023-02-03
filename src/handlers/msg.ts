import { Composer } from "grammy/mod.ts";
import { TG_MAX_MESSAGE_LENGTH, TG_MES_PR, } from "./../consts.ts";

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
    async (ctx) => {
        console.log("17: ", ctx.update);
        let msgToSend = TG_MES_PR(ctx.update);
        if (msgToSend.length > TG_MAX_MESSAGE_LENGTH) {
            while (msgToSend.length > TG_MAX_MESSAGE_LENGTH) {
                console.log("21: ", msgToSend);
                let io: string = msgToSend.substring(0, TG_MAX_MESSAGE_LENGTH);
                await ctx.reply(
                    `<pre><code class="language-json">${io}</code></pre>`
                );
                msgToSend = msgToSend.substring(TG_MAX_MESSAGE_LENGTH);
            }
        }
        console.log("29: ", msgToSend);console.log("21: ", msgToSend);
        return await ctx.reply(
            `<pre><code class="language-json">${msgToSend}</code></pre>`
        );
    }
);
