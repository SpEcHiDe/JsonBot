import { Composer } from "grammy/mod.ts";

import tgbte from "./tgbte.ts";
import rm from "./yTestRm.ts";
import rr from "./yTestRr.ts";
import msg from "./msg.ts";
import mr from "./mr.ts";
import inline from "./inline.ts";
import cir from "./cir.ts";
import cbdata from "./cbdata.ts";
import cm from "./cm.ts";
import cjr from "./cjr.ts";

export const composer = new Composer();

composer.use(tgbte);
composer.use(rm);
composer.use(rr);
composer.use(msg);
composer.use(mr);
composer.use(inline);
composer.use(cir);
composer.use(cbdata);
// TODO: 4
composer.use(cm);
composer.use(cjr);
// TODO: 2

composer.use((ctx) => console.log("UnHandled update", JSON.stringify(ctx)));
