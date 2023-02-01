import { Composer } from "grammy/mod.ts";

import tgbte from "./tgbte.ts";
import msg from "./msg.ts";
import cjr from "./cjr.ts";
import inline from "./inline.ts";
import cbdata from "./cbdata.ts";
import cir from "./cir.ts";

export const composer = new Composer();

composer.use(tgbte);
composer.use(msg);
composer.use(inline);
composer.use(cir);
composer.use(cbdata);
composer.use(cjr);
