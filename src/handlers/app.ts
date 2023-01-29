import { Composer } from "https://deno.land/x/grammy@v1.13.1/mod.ts";

import tgbte from "./tgbte";
import msg from "./msg";
import cjr from "./cjr";
import inline from "./inline";
import cbdata from "./cbdata";
import cir from "./cir";

export const composer = new Composer();

composer.use(tgbte);
composer.use(msg);
composer.use(inline);
composer.use(cir);
composer.use(cbdata);
composer.use(cjr);
