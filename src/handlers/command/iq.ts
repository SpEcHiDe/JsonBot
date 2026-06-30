import { Composer, GrammyError } from "grammy/mod.ts";
import { MyContext } from "./../../ctx.flavour.ts";

export const composer = new Composer<MyContext>();

export default composer;

composer.on(
    "inline_query",
    async (ctx, next) => {
        const inlineQuery = ctx.inlineQuery;
        if (inlineQuery.query.startsWith("/A ")) {
            try {
                await ctx.answerInlineQuery(
                    [
                        {
                            type: "article",
                            id: "RMD1",
                            title: "Rich Text Markdown",
                            description: ` `,
                            input_message_content: {
                                rich_message: {
                                    markdown: inlineQuery.query.substring(2),
                                    is_rtl: false,
                                    skip_entity_detection: true,
                                },
                            },
                        },
                    ],
                    {
                        cache_time: 0,
                        is_personal: true,
                        button: {
                            text: ` RICH TEXT MARKDOWN `,
                            start_parameter: "rmdS",
                        },
                        next_offset: "",
                    },
                );
            } catch (error) {
                console.log("89");
                console.log(error);
                console.log("91");
                if (error instanceof GrammyError) {
                    await ctx.answerInlineQuery(
                        [
                            {
                                type: "article",
                                id: "error_callback",
                                title: "⚠️ Error Occurred",
                                description:
                                    ` ${error.error_code} ${error.description}`,
                                input_message_content: {
                                    message_text:
                                        `⚠️ Request to Telegram API failed with <b><u>${error.error_code}</u></b> <code>${error.description}</code>`,
                                    parse_mode: "HTML",
                                    link_preview_options: {
                                        is_disabled: true,
                                    },
                                },
                            },
                        ],
                        {
                            cache_time: 0,
                            is_personal: true,
                            button: {
                                text:
                                    ` ${error.error_code} ${error.description}`,
                                start_parameter: "inlinerror",
                            },
                            next_offset: "",
                        },
                    );
                }
            }
        }
        // https://t.me/c/1493653006/116753
        await next();
    },
);
