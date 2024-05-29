import { Context } from "grammy/mod.ts";

export interface BotConfig {
    botToken: string;
    botMode: string;
}

export type MyContext = Context & {
    botConfig: BotConfig;
};
