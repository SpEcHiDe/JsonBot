import { Update } from "grammy/types.ts";

// Telegram Constants
export const TG_MAX_MESSAGE_LENGTH = 4096;
export const TG_MAX_CAPTION_LENGTH = 1024;
const TG_FILE_ID_BASEURL = "https://slow.transload.workers.dev";

// BEGIN: MEME RESOURCES
export const CLONE_MANGO_STICKER_FILE_ID = "CAADBQAD3wEAAjzLfB_2ory8DFKOUwI";
export const A_STICKER_FILE_ID = "CAADAgADG3UBAAFji0YMqkd3zY0-GJUC";
export const STICKER_FILE_ID = "CAADAgADpAwAAqoUyEoBbu6msnyOHAI";
export const V_STICKER_FILE_ID = "BAADAgAD_xMAAkZPsUs6D0o2CG9D6wI";
export const STICKER_URL =
    `${TG_FILE_ID_BASEURL}/${STICKER_FILE_ID}/sticker.jpg`;
export const STICKER_WIDTH = 512;
export const STICKER_HEIGHT = 325;
export const SMAII_STICKER_WIDTH = 100;
export const SMAII_STICKER_HEIGHT = 100;
export const SMAII_STICKER_URL =
    `https://wsrv.nl/?url=${STICKER_URL}&w=${SMAII_STICKER_WIDTH}&h=${SMAII_STICKER_HEIGHT}`;
export const AUDIO_URL =
    `${TG_FILE_ID_BASEURL}/CQACAgQAAx0ETVHxPQACEppko5nyI2SNuzh0_ac1j1qUZU-bgAACaQwAAhEnsVJKki-yo4Ii7S8E/audio.mp3`;
export const AUDIO_DURATION = 19;
export const GIF_URL =
    `${TG_FILE_ID_BASEURL}/CgACAgIAAx0ETVHxPQACEp1ko5nzGJuPS7bxWaJzP0NAvhLngAACvhEAAh3uYEq2tzRs0BHTBy8E/animation.gif`;
export const GIF_WIDTH = 320;
export const GIF_HEIGHT = 134;
export const GIF_DURATION = 3;
export const GIF_2_URL =
    `${TG_FILE_ID_BASEURL}/CgACAgIAAx0ETVHxPQACEp1ko5nzGJuPS7bxWaJzP0NAvhLngAACvhEAAh3uYEq2tzRs0BHTBy8E/mpeg4.mp4`;
export const GIF_2_WIDTH = 848;
export const GIF_2_HEIGHT = 384;
export const GIF_2_DURATION = 1;
export const VIDEO_URL =
    `${TG_FILE_ID_BASEURL}/BAACAgEAAx0ETVHxPQACEptko5nyp8wNcA3weMwSNU49QXDjJQACYgQAAlxzsUaAS1fnZpA2nC8E/video.mp4`;
export const VOICE_URL =
    `${TG_FILE_ID_BASEURL}/AwACAgQAAx0ETVHxPQACEplko5nylwK28UAWcx5KRiucCtIvlAACaAwAAhEnsVI0A3WL3R36-i8E/voice.ogg`;
export const YT_VIDEO_URL = "https://youtu.be/JmvCpR45LKA";
export const YT_VIDEO_DURATION = 103;
export const MR_INVALID_SYNTAX = "<code>SYNTAX_IN_VALID</code>";
// END: MEME RESOURCES

export const TG_ALLOWED_UPDATES: Array<string> = [
    "message",
    "edited_message",
    "channel_post",
    "edited_channel_post",
    "business_connection",
    "business_message",
    "edited_business_message",
    "deleted_business_messages",
    "message_reaction",
    "message_reaction_count",
    "inline_query",
    "chosen_inline_result",
    "callback_query",
    "shipping_query",
    "pre_checkout_query",
    "poll",
    "poll_answer",
    "my_chat_member",
    "chat_member",
    "chat_join_request",
    "chat_boost",
    "removed_chat_boost",
];
export const TG_ENV_S = Deno.env.toObject();
const KW_TG_ERR = (msg: string): string => {
    return msg
        // 128207
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;");
    // not sure why this is not required
    // .replaceAll(">", "&rt;");
};
export const TG_MES_PR = (upd: Update) => {
    // https://stackoverflow.com/a/3515761/4723940
    return KW_TG_ERR(
        JSON.stringify(
            upd,
            null,
            2,
        ),
    );
    // <= https://t.me/c/1220993104/1/1353555
};
export const TG_PR_MES = (msg: string) => {
    // 1094034
    return `<pre><code class="language-json">${msg}</code></pre>`;
};
export const TG_ERR_MES = (error: any) => {
    try {
        delete error.parameters;
        delete error.method;
        delete error.payload;
        delete error.name;
    } catch (_) {
        /* https://csswizardry.com/2013/04/shame-css/ */
    }
    return JSON.stringify(
        error,
        null,
        2,
    );
};
