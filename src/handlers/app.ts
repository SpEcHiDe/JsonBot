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
// TODO: 4
composer.use(cm);
composer.use(cjr);
// TODO: 2

composer.use(
    (ctx) => console.log("UnHandled update", JSON.stringify(ctx))
);
