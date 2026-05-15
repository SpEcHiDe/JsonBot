import { Composer } from "grammy/mod.ts";
import { TG_MAX_MESSAGE_LENGTH, TG_MES_PR, TG_PR_MES } from "./../../consts.ts";

export const composer = new Composer();

export default composer;

composer.on("guest_message", async (ctx) => {
    const reply_markup = {
        inline_keyboard: [
            [
                {
                    text: "(string) Label text on the button",
                    url: "https://www.example.com",
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
                        text:
                            "The text to be copied to the clipboard; 1-256 characters",
                    },
                },
            ],
            // [
            //     {
            //         text: "(string) Label text on the button",
            //         login_url: {
            //             url: "https://www.example.com/",
            //         },
            //     },
            // ],
        ],
    };
    const GM = ctx.msg;
    const guest_query_id = GM.guest_query_id;
    const msgToSend = TG_MES_PR(ctx.update);

    if (msgToSend.length > TG_MAX_MESSAGE_LENGTH) {
        // TODO: how to handle larger files?
    } else {
        const input_text_message_content = {
            message_text: TG_PR_MES(
                msgToSend.substring(0, TG_MAX_MESSAGE_LENGTH),
            ),
            parse_mode: "HTML",
        };
        await ctx.api.raw.answerGuestQuery({
            guest_query_id: guest_query_id,
            result: {
                type: "article",
                id: "1",
                title: "(string) Title of the result",
                input_message_content: input_text_message_content,
                reply_markup: reply_markup,
                url: "",
                hide_url: true,
                description:
                    "(string) Optional. Short description of the result",
                // thumbnail_url: SMAII_STICKER_URL,
                // thumbnail_width: SMAII_STICKER_WIDTH,
                // thumbnail_height: SMAII_STICKER_HEIGHT,
            },
        });
    }
});
