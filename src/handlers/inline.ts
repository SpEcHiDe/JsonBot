import { Composer, InlineKeyboard, InlineQueryResultBuilder } from "grammy/mod.ts";
import {
    A_STICKER_FILE_ID,
    AUDIO_DURATION,
    AUDIO_URL,
    GIF_2_DURATION,
    GIF_2_HEIGHT,
    GIF_2_URL,
    GIF_2_WIDTH,
    GIF_DURATION,
    GIF_HEIGHT,
    GIF_URL,
    GIF_WIDTH,
    SMAII_STICKER_HEIGHT,
    SMAII_STICKER_URL,
    SMAII_STICKER_WIDTH,
    STICKER_FILE_ID,
    STICKER_HEIGHT,
    STICKER_URL,
    STICKER_WIDTH,
    TG_MAX_CAPTION_LENGTH,
    TG_MAX_MESSAGE_LENGTH,
    TG_MES_PR,
    TG_PR_MES,
    V_STICKER_FILE_ID,
    VIDEO_URL,
    VOICE_URL,
    YT_VIDEO_DURATION,
    YT_VIDEO_URL,
} from "./../consts.ts";

const composer = new Composer();

export default composer;

composer.on("inline_query", (ctx) => {
    const msgToSend = TG_MES_PR(ctx.update);
    //
    const reply_markup = {
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
                    switch_inline_query:
                        "(string) Optional. If set, pressing the button will prompt the user to select one of their chats, open that chat and insert the bot's username and the specified inline query in the input field. May be empty, in which case just the bot's username will be inserted.",
                },
                {
                    text: "(string) Label text on the button",
                    switch_inline_query_current_chat:
                        "(string) Optional. If set, pressing the button will insert the bot's username and the specified inline query in the current chat's input field. May be empty, in which case only the bot's username will be inserted.",
                },
            ],
            [
                {
                    text: "(string) Label text on the button",
                    callback_data:
                        "(Optional). Data associated with the callback button.",
                },
                {
                    text: "(string) Label text on the button",
                    copy_text: {
                        text: "The text to be copied to the clipboard; 1-256 characters",
                    },
                },
            ],
            [
                {
                    text: "(string) Label text on the button",
                    login_url: {
                        url: "https://www.example.com/",
                    },
                },
            ],
        ],
    };
    //
    const input_text_message_content = {
        message_text: TG_PR_MES(
            msgToSend.substring(0, TG_MAX_CAPTION_LENGTH),
        ),
        parse_mode: "HTML",
    };
    const inputTextMessageContent = {
        message_text: `<a href="${YT_VIDEO_URL}">&#x200b;</a>${
            TG_PR_MES(
                msgToSend.substring(0, TG_MAX_MESSAGE_LENGTH),
            )
        }`,
        parse_mode: "HTML",
    };
    const msgCaption = TG_PR_MES(
        msgToSend.substring(0, TG_MAX_MESSAGE_LENGTH),
    );
    
    const iqr = [
        {
            type: "article",
            id: "1",
            title: "(string) Title of the result",
            input_message_content: input_text_message_content,
            reply_markup: reply_markup,
            url: STICKER_URL,
            hide_url: true,
            description:
                "(string) Optional. Short description of the result",
            thumbnail_url: SMAII_STICKER_URL,
            thumbnail_width: SMAII_STICKER_WIDTH,
            thumbnail_height: SMAII_STICKER_HEIGHT,
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
            description:
                "(string) Optional. Short description of the result",
            thumbnail_url: SMAII_STICKER_URL,
            thumbnail_width: SMAII_STICKER_WIDTH,
            thumbnail_height: SMAII_STICKER_HEIGHT,
        },
        {
            type: "photo",
            id: "3",
            photo_url: STICKER_URL,
            thumbnail_url: SMAII_STICKER_URL,
            photo_width: STICKER_WIDTH,
            photo_height: STICKER_HEIGHT,
            title: "(string) Title of the result",
            description:
                "(string) Optional. Short description of the result",
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
            thumbnail_url: SMAII_STICKER_URL,
            thumbnail_mime_type: "image/jpeg",
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
            thumbnail_url: SMAII_STICKER_URL,
            thumbnail_mime_type: "image/jpeg",
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
            thumbnail_url: SMAII_STICKER_URL,
            title: "(string) Title of the result",
            caption: msgCaption,
            parse_mode: "HTML",
            video_width: 0,
            video_height: 0,
            video_duration: YT_VIDEO_DURATION,
            description:
                "(string) Optional. Short description of the result",
            reply_markup: reply_markup,
            // input_message_content:
        },
        {
            type: "video",
            id: "7",
            video_url: YT_VIDEO_URL,
            mime_type: "text/html",
            thumbnail_url: SMAII_STICKER_URL,
            title: "(string) Title of the result",
            caption: msgCaption,
            parse_mode: "HTML",
            video_width: 0,
            video_height: 0,
            video_duration: YT_VIDEO_DURATION,
            description:
                "(string) Optional. Short description of the result",
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
            id: "13TG93AT43",
            sticker_file_id: A_STICKER_FILE_ID,
        },
        {
            type: "sticker",
            id: "ShitDevsSay",
            sticker_file_id: STICKER_FILE_ID,
        },
        {
            type: "sticker",
            id: "139343",
            sticker_file_id: V_STICKER_FILE_ID,
        },
    ];

    const mwe = [
        "18D50D350E42A3F7A8CD5ABE171FE17B4B1DC04A",
        "7EB473E682D6D8A6EA5F792F621E43CD6AA4C91B",
        "C339D344F2CB4EC49B57423D9AED37A32B7D6DF6",
        "45F3AE06D73CC590420733B5657EE6B153B85F20",
        "B8ED532B7C83968B06885D1D439EE68F5DFFC5C7",
        "C3D92CD75C771E6B405F54D7A43ACA65FE82B5B5",
        "464B7B587E07070FFBA3DA4D68397BDC8DAAC029",
        "EC193E01DCD111D5A5B39C1F6684695A355E18B5",
        "39FFFF61CF16FD0681CEB90DF4A62DEDFFCFE15C",
        "00B661AD7F58901E3DAB4A9BDC85234C9FFF2460",
        "65B67A10E496F172C7F77CB7D1DA41C55CDD0F17",
        "0624B3A5DE9F03771D1189AEB400FF05D901FA6F",
        "FF4AAFBAEEA2D6EF0B3F32B96BCEE068FC65EE9F",
        "60F5AEA83EA88E2645F907E78349DCD74D422318",
        "918CBFCBCA79D3888A7D68268E1EA2542EB06F23",
        "6FFEC7F5B9B94A600867E0D205B654E518D7C3C9",
        "91FC76927E4DCFE54E2EC21660BCE5ED4E80D675",
        "E91DDDB1B089BA0274A16BD3A2F46C2B9B042009",
        "54A0CB15C2A5B7D8D806107B86F057A0D2BFF714",
        "1CC763D0BE6682683E73F8754AFE0B0A7CEF0231",
    ];
    const botUserName = "usetgxbot";
    const deepLinkType = "start";
    for (const e of mwe) {
        const ikb = new InlineKeyboard();
        const invalidButtonUrl = `https://${botUserName}.t.me/?${deepLinkType}=${encodeURIComponent(e)}`
        ikb.add({
            text: "🧲 🌀",
            url: invalidButtonUrl
        });
        iqr.push(
            InlineQueryResultBuilder.article(
                `${e}`,
                e,
                {
                    reply_markup: ikb,
                    // url: PermaUrl,
                    description: e.split("").reverse().join(""),
                    // thumbnail_url: thumbnail_url,
                    // thumbnail_width: 60
                    // thumbnail_height: 60
                }
            ).text(
                e,
                {
                    parse_mode: "HTML",
                    link_preview_options: {
                        is_disabled: true
                    }
                }
            )
        );
    }

    /**
     * TODO: https://grammy.dev/guide/inline-queries.html
     */
    return ctx.answerInlineQuery(
        iqr,
        {
            cache_time: 300,
            is_personal: true,
            next_offset: "",
            button: {
                text:
                    "(string) Optional. If passed, clients will display a button with specified text that switches the user to a private chat with the bot and sends the bot a start message with the parameter switch_pm_parameter",
                start_parameter: "inline-deep-link",
            },
        },
    );
});
