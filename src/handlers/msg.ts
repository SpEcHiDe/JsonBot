import { Composer, Context } from "grammy/mod.ts";
import { TG_MAX_MESSAGE_LENGTH, TG_MES_PR, TG_PR_MES } from "./../consts.ts";

export const composer = new Composer();

export default composer;

export async function msgUpdate(ctx: Context) {
    let reply_markup = undefined;
    if (ctx?.msg?.chat?.is_direct_messages === true) {
        reply_markup = {
            inline_keyboard: [
                [
                    {
                        text: "(string) Label text on the button",
                        url: "https://core.telegram.org/bots/api-changelog#august-15-2025",
                    },
                ],
                // [
                //     {
                //         text: "(string) Label text on the button",
                //         switch_inline_query: "(string) Optional. If set, pressing the button will prompt the user to select one of their chats, open that chat and insert the bot's username and the specified inline query in the input field. May be empty, in which case just the bot's username will be inserted.",
                //     },
                //     {
                //         text: "(string) Label text on the button",
                //         switch_inline_query_current_chat: "(string) Optional. If set, pressing the button will insert the bot's username and the specified inline query in the current chat's input field. May be empty, in which case only the bot's username will be inserted.",
                //     },
                // ],
                [
                    {
                        text: "(string) Label text on the button",
                        callback_data: "(Optional). Data associated with the callback button.",
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
    }
    let msgToSend = TG_MES_PR(ctx.update);
    if (msgToSend.length > TG_MAX_MESSAGE_LENGTH) {
        while (msgToSend.length > TG_MAX_MESSAGE_LENGTH) {
            const io: string = msgToSend.substring(
                0,
                TG_MAX_MESSAGE_LENGTH,
            );
            await ctx.reply(
                TG_PR_MES(io),
                {
                    parse_mode: "HTML",
                    reply_markup: reply_markup,
                }
            );
            msgToSend = msgToSend.substring(TG_MAX_MESSAGE_LENGTH);
        }
    }
    return await ctx.reply(
        TG_PR_MES(msgToSend),
        {
            parse_mode: "HTML",
            reply_markup: reply_markup,
        }
    );
}

composer.on(
    // https://t.me/c/1493653006/107322
    [
        "message",
        "edited_message",
        "channel_post",
        "edited_channel_post",
        "business_message",
        "edited_business_message",
        "deleted_business_messages",
    ],
    msgUpdate,
);
