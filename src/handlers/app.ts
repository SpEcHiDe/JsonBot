import { Composer } from "grammy/mod.ts";

import rm from "./command/rm.ts";
import rr from "./command/rr.ts";
import msg from "./update/msg.ts";
import bc from "./update/bc.ts";
import mr from "./update/mr.ts";
import inline from "./update/inline.ts";
import cir from "./update/cir.ts";
import cbdata from "./update/cbdata.ts";
import cm from "./update/cm.ts";
import cjr from "./update/cjr.ts";
import ppm from "./update/ppm.ts";
import mb from "./update/mb.ts";

import { MyContext } from "./../ctx.flavour.ts";
// temporary
import { TG_MAX_MESSAGE_LENGTH, TG_MES_PR, TG_PR_MES } from "../consts.ts";

export const composer = new Composer<MyContext>();

// composer.use(async (ctx, next) => {
//     console.log(ctx.update);
//     await next();
// });

composer.use(rm);
composer.use(rr);

composer.use(msg);
composer.use(bc);
composer.use(mr);
composer.use(inline);
composer.use(cir);
composer.use(cbdata);
composer.use(ppm);
/** TODO:
 * poll
 * poll_answer
 */
composer.use(cm);
composer.use(cjr);
composer.use(mb);

composer.use(
    async (ctx) => {
        if (ctx.update.guest_message) {
            const GM = ctx.update.guest_message;
            const guest_query_id = GM.guest_query_id;
            const msgToSend = TG_MES_PR(ctx.update);
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
                    // reply_markup: reply_markup,
                    url: "",
                    hide_url: true,
                    description: "(string) Optional. Short description of the result",
                    // thumbnail_url: SMAII_STICKER_URL,
                    // thumbnail_width: SMAII_STICKER_WIDTH,
                    // thumbnail_height: SMAII_STICKER_HEIGHT,
                },
            });
        }
        else {
            console.log("UnHandled update", JSON.stringify(ctx.update));
        }
    }
);
