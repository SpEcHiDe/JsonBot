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

export const composer = new Composer<MyContext>();

// composer.use(async (ctx, next) => {
//     console.log(ctx.update);
//     await next();
// })

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
    (ctx) => console.log("UnHandled update", JSON.stringify(ctx)),
);
