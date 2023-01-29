import { Composer } from "https://deno.land/x/grammy@v1.13.1/mod.ts";
import {
    TG_MAX_MESSAGE_LENGTH,
    TG_MAX_CAPTION_LENGTH,

    STICKER_FILE_ID,

    STICKER_URL,
    STICKER_WIDTH,
    STICKER_HEIGHT,

    SMAII_STICKER_URL,
    SMAII_STICKER_WIDTH,
    SMAII_STICKER_HEIGHT,

    AUDIO_URL,
    AUDIO_DURATION,
    VOICE_URL,

    GIF_URL,
    GIF_WIDTH,
    GIF_HEIGHT,
    GIF_DURATION,

    GIF_2_URL,
    GIF_2_WIDTH,
    GIF_2_HEIGHT,
    GIF_2_DURATION,

    VIDEO_URL,
    YT_VIDEO_URL,
    YT_VIDEO_DURATION,
} from "./../consts";

const composer = new Composer();

export default composer;

composer.on("inline_query", (ctx) => {
    // https://stackoverflow.com/a/3515761/4723940
    let msgToSend = JSON.stringify(
        ctx.update,
        null,
        4
    );
    //
    let reply_markup = {
        inline_keyboard: [
            [
                {
                    text: "(string) Label text on the button",
                    url: STICKER_URL,
                },
            ],
            [
                {
                    text: "(string) Label text on the button",
                    switch_inline_query: "(string) Optional. If set, pressing the button will prompt the user to select one of their chats, open that chat and insert the bot's username and the specified inline query in the input field. May be empty, in which case just the bot's username will be inserted.",
                },
                {
                    text: "(string) Label text on the button",
                    switch_inline_query_current_chat: "(string) Optional. If set, pressing the button will insert the bot's username and the specified inline query in the current chat's input field. May be empty, in which case only the bot's username will be inserted.",
                },
            ],
        ]
    };
    //
    let input_text_message_content = {
        message_text: `<pre><code class="language-json">${msgToSend.substring(0, TG_MAX_MESSAGE_LENGTH)}</code></pre>`,
    };
    let inputTextMessageContent = {
        message_text: `<a href="${YT_VIDEO_URL}">&#x200b;</a><pre><code class="language-json">${msgToSend.substring(0, TG_MAX_MESSAGE_LENGTH)}</code></pre>`,
    };
    let msgCaption = `<pre><code class="language-json">${msgToSend.substring(0, TG_MAX_CAPTION_LENGTH)}</code></pre>`;
    //
    /**
     * https://grammy.dev/guide/inline-queries.html
     */
    return ctx.answerInlineQuery(
        [
            {
                type: "article",
                id: "1",
                title: "(string) Title of the result",
                input_message_content: input_text_message_content,
                reply_markup: reply_markup,
                url: STICKER_URL,
                hide_url: true,
                description: "(string) Optional. Short description of the result",
                thumb_url: SMAII_STICKER_URL,
                thumb_width: SMAII_STICKER_WIDTH,
                thumb_height: SMAII_STICKER_HEIGHT,
            },
            {
                type: "article",
                id: "2",
                title: "(string) Title of the result",
                input_message_content: {
                    phone_number: "+424314159",
                    first_name: "(string) Contact's first name",
                    last_name: "(string) Optional. Contact's last name",
                    vcard: "",
                },
                reply_markup: reply_markup,
                url: STICKER_URL,
                hide_url: true,
                description: "(string) Optional. Short description of the result",
                thumb_url: SMAII_STICKER_URL,
                thumb_width: SMAII_STICKER_WIDTH,
                thumb_height: SMAII_STICKER_HEIGHT,
            },
            {
                type: "photo",
                id: "3",
                photo_url: STICKER_URL,
                thumb_url: SMAII_STICKER_URL,
                photo_width: STICKER_WIDTH,
                photo_height: STICKER_HEIGHT,
                title: "(string) Title of the result",
                description: "(string) Optional. Short description of the result",
                caption: msgCaption,
                parse_mode: "HTML",
                reply_markup: reply_markup,
                // input_message_content:
            },
            {
                type: "gif",
                id: "4",
                gif_url: GIF_URL,
                gif_width: GIF_WIDTH,
                gif_height: GIF_HEIGHT,
                gif_duration: GIF_DURATION,
                thumb_url: SMAII_STICKER_URL,
                thumb_mime_type: "image/jpeg",
                title: "(string) Title of the result",
                caption: msgCaption,
                parse_mode: "HTML",
                reply_markup: reply_markup,
                // input_message_content:
            },
            {
                type: "mpeg4_gif",
                id: "5",
                mpeg4_url: GIF_2_URL,
                mpeg4_width: GIF_2_WIDTH,
                mpeg4_height: GIF_2_HEIGHT,
                mpeg4_duration: GIF_2_DURATION,
                thumb_url: SMAII_STICKER_URL,
                thumb_mime_type: "image/jpeg",
                title: "(string) Title of the result",
                caption: msgCaption,
                parse_mode: "HTML",
                reply_markup: reply_markup,
                // input_message_content:
            },
            {
                type: "video",
                id: "6",
                video_url: VIDEO_URL,
                mime_type: "video/mp4",
                thumb_url: SMAII_STICKER_URL,
                title: "(string) Title of the result",
                caption: msgCaption,
                parse_mode: "HTML",
                video_width: 0,
                video_height: 0,
                video_duration: YT_VIDEO_DURATION,
                description: "(string) Optional. Short description of the result",
                reply_markup: reply_markup,
                // input_message_content:
            },
            {
                type: "video",
                id: "7",
                video_url: YT_VIDEO_URL,
                mime_type: "text/html",
                thumb_url: SMAII_STICKER_URL,
                title: "(string) Title of the result",
                caption: msgCaption,
                parse_mode: "HTML",
                video_width: 0,
                video_height: 0,
                video_duration: YT_VIDEO_DURATION,
                description: "(string) Optional. Short description of the result",
                reply_markup: reply_markup,
                input_message_content: inputTextMessageContent,
            },
            {
                type: "audio",
                id: "8",
                audio_url: AUDIO_URL,
                title: "(string) Title of the result",
                caption: msgCaption,
                parse_mode: "HTML",
                performer: "(string) Optional. Performer",
                audio_duration: AUDIO_DURATION,
                reply_markup: reply_markup,
                // input_message_content:
            },
            {
                type: "voice",
                id: "9",
                voice_url: VOICE_URL,
                title: "(string) Title of the result",
                caption: msgCaption,
                parse_mode: "HTML",
                voice_duration: AUDIO_DURATION,
                reply_markup: reply_markup,
                // input_message_content:
            },
            {
                type: "sticker",
                id: "ShitDevsSay",
                sticker_file_id: STICKER_FILE_ID,
            },
        ],
        {
            cache_time: 300,
            is_personal: true,
            next_offset: "",
            switch_pm_text: "(string) Optional. If passed, clients will display a button with specified text that switches the user to a private chat with the bot and sends the bot a start message with the parameter switch_pm_parameter",
            switch_pm_parameter: "inline-deep-link",
        }
    );
});
