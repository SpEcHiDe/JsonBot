import { Composer } from "grammy/mod.ts";

// import tgbte from "./tgbte.ts";
import rm from "./yTestRm.ts";
import rr from "./yTestRr.ts";
import msg from "./msg.ts";
import bc from "./bc.ts";
import mr from "./mr.ts";
import inline from "./inline.ts";
import cir from "./cir.ts";
import cbdata from "./cbdata.ts";
import cm from "./cm.ts";
import cjr from "./cjr.ts";
import mb from "./mb.ts";

import { MyContext } from "../bots.ts";

export const composer = new Composer<MyContext>();

// composer.use(async (ctx, next) => {
//     console.log(ctx.update);
//     await next();
// })

// composer.use(tgbte);
composer.use(rm);
composer.use(rr);

composer.use(msg);
composer.use(bc);
composer.use(mr);
composer.use(inline);
composer.use(cir);
composer.use(cbdata);
/** TODO: 
 * shipping_query
 * pre_checkout_query
 * purchased_paid_media
 * poll
 * poll_answer
 */
composer.use(cm);
composer.use(cjr);
composer.use(mb);

composer.use(
    (ctx) => console.log("UnHandled update", JSON.stringify(ctx))
);
